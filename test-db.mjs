import db from './db.js'
import { authMiddleware, signAccessToken } from './middleware/auth.js'

const token = signAccessToken({ id: 1, username: 'admin', role: 'admin' })
console.log('Token:', token.substring(0, 20) + '...')

try {
  const rows = db.prepare('SELECT id, name, category_id, data FROM recipes ORDER BY name LIMIT 5 OFFSET 0').all()
  console.log('Recipes:', rows.length, 'items')
  if (rows.length > 0) {
    const parsed = JSON.parse(rows[0].data)
    console.log('First recipe:', parsed.name || rows[0].name)
  }
} catch (e) {
  console.error('Recipes error:', e.message)
}

try {
  const rows = db.prepare('SELECT id, name, category, icon, data FROM products ORDER BY name LIMIT 5 OFFSET 0').all()
  console.log('Products:', rows.length, 'items')
  if (rows.length > 0) {
    const parsed = JSON.parse(rows[0].data)
    console.log('First product:', parsed.name || rows[0].name)
  }
} catch (e) {
  console.error('Products error:', e.message)
}

process.exit(0)
