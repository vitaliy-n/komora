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
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
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
`)

const defaultUser = db.prepare('SELECT COUNT(*) as count FROM users').get()
if (defaultUser.count === 0) {
  const hash = bcrypt.hashSync('admin123', 10)
  db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run('admin', hash, 'admin')
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
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } })
})

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user })
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

app.get('/api/stats', authMiddleware, (req, res) => {
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count
  const recipeCount = db.prepare('SELECT COUNT(*) as count FROM recipes').get().count
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count
  res.json({ products: productCount, recipes: recipeCount, users: userCount })
})

app.get('/api/products', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT id, name, category, icon, data, created_at, updated_at FROM products ORDER BY name').all()
  res.json(rows.map(r => ({ ...JSON.parse(r.data), id: r.id, name: r.name, category: r.category, icon: r.icon })))
})

app.post('/api/products', authMiddleware, (req, res) => {
  const { id, name, category, icon = '📦', ...rest } = req.body
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

app.get('/api/recipes', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT id, name, category_id, data, created_at, updated_at FROM recipes ORDER BY name').all()
  res.json(rows.map(r => ({ ...JSON.parse(r.data), id: r.id, name: r.name, categoryId: r.category_id })))
})

app.post('/api/recipes', authMiddleware, (req, res) => {
  const { id, name, categoryId, ...rest } = req.body
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

const distPath = path.join(__dirname, '..', 'dist')
app.use(express.static(distPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Komora server running on http://localhost:${PORT}`)
})
