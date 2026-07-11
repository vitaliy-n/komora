import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const JWT_SECRET = process.env.JWT_SECRET || 'komora-secret-change-in-production'
const PORT = process.env.PORT || 3001

const db = new Database(path.join(__dirname, 'komora.db'))
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT DEFAULT '📦',
    data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category_id TEXT,
    data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_cannings (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS user_inventory (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`)

const defaultUser = db.prepare('SELECT COUNT(*) as count FROM users').get()
if (defaultUser.count === 0) {
  const hash = bcrypt.hashSync('admin123', 10)
  db.prepare('INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)').run('admin', 'admin@komora.local', hash, 'admin')
  console.log('Default admin user created: admin / admin123')
}

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Не авторизовано' })
  }
  const token = header.slice(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Недійсний токен' })
  }
}

function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Доступ лише для адміністратора' })
  }
  next()
}

// ─── Auth ───

app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Введіть логін та пароль' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль має бути не менше 6 символів' })
  }
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username)
  if (existing) {
    return res.status(409).json({ error: 'Користувач з таким логіном вже існує' })
  }
  if (email) {
    const existingEmail = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (existingEmail) {
      return res.status(409).json({ error: 'Email вже використовується' })
    }
  }
  const hash = bcrypt.hashSync(password, 10)
  const result = db.prepare('INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)').run(username, email || null, hash, 'user')
  const token = jwt.sign({ id: result.lastInsertRowid, username, role: 'user' }, JWT_SECRET, { expiresIn: '24h' })
  res.json({ token, user: { id: result.lastInsertRowid, username, email, role: 'user' } })
})

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Введіть логін та пароль' })
  }
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Невірний логін або пароль' })
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' })
  res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } })
})

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, username, email, role, created_at FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ error: 'Користувача не знайдено' })
  res.json({ user })
})

app.post('/api/auth/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(401).json({ error: 'Невірний поточний пароль' })
  }
  const hash = bcrypt.hashSync(newPassword, 10)
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, user.id)
  res.json({ success: true })
})

// ─── User data sync (cannings) ───

app.get('/api/cannings', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT id, data FROM user_cannings WHERE user_id = ?').all(req.user.id)
  res.json(rows.map(r => JSON.parse(r.data)))
})

app.post('/api/cannings', authMiddleware, (req, res) => {
  const { id } = req.body
  if (!id) return res.status(400).json({ error: 'Потрібне поле: id' })
  const data = JSON.stringify(req.body)
  db.prepare(`
    INSERT INTO user_cannings (id, user_id, data) VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET data = ?, updated_at = CURRENT_TIMESTAMP
  `).run(id, req.user.id, data, data)
  res.json({ success: true })
})

app.post('/api/cannings/bulk', authMiddleware, (req, res) => {
  const { items } = req.body
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Очікується масив items' })
  const stmt = db.prepare(`
    INSERT INTO user_cannings (id, user_id, data) VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET data = ?, updated_at = CURRENT_TIMESTAMP
  `)
  const tx = db.transaction(() => {
    for (const item of items) {
      stmt.run(item.id, req.user.id, JSON.stringify(item), JSON.stringify(item))
    }
  })
  tx()
  res.json({ success: true, count: items.length })
})

app.delete('/api/cannings/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM user_cannings WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id)
  res.json({ success: true })
})

// ─── User data sync (inventory) ───

app.get('/api/inventory', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT id, data FROM user_inventory WHERE user_id = ?').all(req.user.id)
  res.json(rows.map(r => JSON.parse(r.data)))
})

app.post('/api/inventory', authMiddleware, (req, res) => {
  const { id } = req.body
  if (!id) return res.status(400).json({ error: 'Потрібне поле: id' })
  const data = JSON.stringify(req.body)
  db.prepare(`
    INSERT INTO user_inventory (id, user_id, data) VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET data = ?, updated_at = CURRENT_TIMESTAMP
  `).run(id, req.user.id, data, data)
  res.json({ success: true })
})

app.post('/api/inventory/bulk', authMiddleware, (req, res) => {
  const { items } = req.body
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Очікується масив items' })
  const stmt = db.prepare(`
    INSERT INTO user_inventory (id, user_id, data) VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET data = ?, updated_at = CURRENT_TIMESTAMP
  `)
  const tx = db.transaction(() => {
    for (const item of items) {
      stmt.run(item.id, req.user.id, JSON.stringify(item), JSON.stringify(item))
    }
  })
  tx()
  res.json({ success: true, count: items.length })
})

app.delete('/api/inventory/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM user_inventory WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id)
  res.json({ success: true })
})

// ─── Stats ───

app.get('/api/stats', authMiddleware, (req, res) => {
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count
  const recipeCount = db.prepare('SELECT COUNT(*) as count FROM recipes').get().count
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count
  const canningCount = req.user.role === 'admin'
    ? db.prepare('SELECT COUNT(*) as count FROM user_cannings').get().count
    : db.prepare('SELECT COUNT(*) as count FROM user_cannings WHERE user_id = ?').get(req.user.id).count
  const inventoryCount = req.user.role === 'admin'
    ? db.prepare('SELECT COUNT(*) as count FROM user_inventory').get().count
    : db.prepare('SELECT COUNT(*) as count FROM user_inventory WHERE user_id = ?').get(req.user.id).count
  res.json({ products: productCount, recipes: recipeCount, users: userCount, canningCount, inventoryCount })
})

// ─── Products CRUD ───

app.get('/api/products', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT id, name, category, icon, data FROM products ORDER BY name').all()
  res.json(rows.map(r => ({ ...JSON.parse(r.data), id: r.id, name: r.name, category: r.category, icon: r.icon })))
})

app.post('/api/products', authMiddleware, (req, res) => {
  const { id, name, category, icon = '📦' } = req.body
  if (!id || !name || !category) {
    return res.status(400).json({ error: 'Потрібні поля: id, name, category' })
  }
  const data = JSON.stringify(req.body)
  db.prepare(`
    INSERT INTO products (id, name, category, icon, data) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET name = ?, category = ?, icon = ?, data = ?, updated_at = CURRENT_TIMESTAMP
  `).run(id, name, category, icon, data, name, category, icon, data)
  res.json({ success: true })
})

app.delete('/api/products/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

app.post('/api/products/bulk', authMiddleware, (req, res) => {
  const { products } = req.body
  if (!Array.isArray(products)) {
    return res.status(400).json({ error: 'Очікується масив products' })
  }
  const stmt = db.prepare(`
    INSERT INTO products (id, name, category, icon, data) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET name = ?, category = ?, icon = ?, data = ?, updated_at = CURRENT_TIMESTAMP
  `)
  const tx = db.transaction(() => {
    for (const p of products) {
      const data = JSON.stringify(p)
      stmt.run(p.id, p.name, p.category, p.icon || '📦', data, p.name, p.category, p.icon || '📦', data)
    }
  })
  tx()
  res.json({ success: true, count: products.length })
})

// ─── Recipes CRUD ───

app.get('/api/recipes', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT id, name, category_id, data FROM recipes ORDER BY name').all()
  res.json(rows.map(r => ({ ...JSON.parse(r.data), id: r.id, name: r.name, categoryId: r.category_id })))
})

app.post('/api/recipes', authMiddleware, (req, res) => {
  const { id, name, categoryId } = req.body
  if (!id || !name) {
    return res.status(400).json({ error: 'Потрібні поля: id, name' })
  }
  const data = JSON.stringify(req.body)
  db.prepare(`
    INSERT INTO recipes (id, name, category_id, data) VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET name = ?, category_id = ?, data = ?, updated_at = CURRENT_TIMESTAMP
  `).run(id, name, categoryId || null, data, name, categoryId || null, data)
  res.json({ success: true })
})

app.delete('/api/recipes/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM recipes WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

app.post('/api/recipes/bulk', authMiddleware, (req, res) => {
  const { recipes } = req.body
  if (!Array.isArray(recipes)) {
    return res.status(400).json({ error: 'Очікується масив recipes' })
  }
  const stmt = db.prepare(`
    INSERT INTO recipes (id, name, category_id, data) VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET name = ?, category_id = ?, data = ?, updated_at = CURRENT_TIMESTAMP
  `)
  const tx = db.transaction(() => {
    for (const r of recipes) {
      const data = JSON.stringify(r)
      stmt.run(r.id, r.name, r.categoryId || null, data, r.name, r.categoryId || null, data)
    }
  })
  tx()
  res.json({ success: true, count: recipes.length })
})

// ─── Admin: Users ───

app.get('/api/admin/users', authMiddleware, adminMiddleware, (req, res) => {
  const users = db.prepare('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC').all()
  const result = users.map(u => {
    const cannings = db.prepare('SELECT COUNT(*) as count FROM user_cannings WHERE user_id = ?').get(u.id).count
    const inventory = db.prepare('SELECT COUNT(*) as count FROM user_inventory WHERE user_id = ?').get(u.id).count
    return { ...u, canningCount: cannings, inventoryCount: inventory }
  })
  res.json(result)
})

app.put('/api/admin/users/:id', authMiddleware, adminMiddleware, (req, res) => {
  const { role } = req.body
  if (!role || !['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Невірна роль' })
  }
  db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, req.params.id)
  res.json({ success: true })
})

app.delete('/api/admin/users/:id', authMiddleware, adminMiddleware, (req, res) => {
  if (Number(req.params.id) === req.user.id) {
    return res.status(400).json({ error: 'Не можна видалити себе' })
  }
  db.prepare('DELETE FROM user_cannings WHERE user_id = ?').run(req.params.id)
  db.prepare('DELETE FROM user_inventory WHERE user_id = ?').run(req.params.id)
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

// ─── Admin: Stats ───

app.get('/api/admin/stats', authMiddleware, adminMiddleware, (req, res) => {
  const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count
  const totalCannings = db.prepare('SELECT COUNT(*) as count FROM user_cannings').get().count
  const totalInventory = db.prepare('SELECT COUNT(*) as count FROM user_inventory').get().count
  const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count
  const totalRecipes = db.prepare('SELECT COUNT(*) as count FROM recipes').get().count
  const todayRegistrations = db.prepare("SELECT COUNT(*) as count FROM users WHERE created_at >= date('now')").get().count
  const weekRegistrations = db.prepare("SELECT COUNT(*) as count FROM users WHERE created_at >= date('now', '-7 days')").get().count
  const monthRegistrations = db.prepare("SELECT COUNT(*) as count FROM users WHERE created_at >= date('now', '-30 days')").get().count
  res.json({
    totalUsers, totalCannings, totalInventory, totalProducts, totalRecipes,
    todayRegistrations, weekRegistrations, monthRegistrations,
  })
})

const distPath = path.join(__dirname, '..', 'dist')
app.use(express.static(distPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Komora server running on http://localhost:${PORT}`)
})
