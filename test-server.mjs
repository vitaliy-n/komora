import express from 'express'
import db from './db.js'
import { authMiddleware, signAccessToken } from './middleware/auth.js'

const app = express()
app.use(express.json())

const token = signAccessToken({ id: 1, username: 'admin', role: 'admin' })

app.get('/test/recipes', authMiddleware, (req, res) => {
  try {
    const page = 1, limit = 50, offset = 0
    const rows = db.prepare('SELECT id, name, category_id, data FROM recipes ORDER BY name LIMIT ? OFFSET ?').all(limit, offset)
    const items = rows.map(r => ({ ...JSON.parse(r.data), id: r.id, name: r.name, categoryId: r.category_id }))
    res.json({ items, total: rows.length, page, limit })
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack })
  }
})

app.get('/test/products', authMiddleware, (req, res) => {
  try {
    const page = 1, limit = 50, offset = 0
    const rows = db.prepare('SELECT id, name, category, icon, data FROM products ORDER BY name LIMIT ? OFFSET ?').all(limit, offset)
    const items = rows.map(r => ({ ...JSON.parse(r.data), id: r.id, name: r.name, category: r.category, icon: r.icon }))
    res.json({ items, total: rows.length, page, limit })
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack })
  }
})

app.listen(3099, () => {
  console.log('Test server on 3099')
  console.log('Token:', token)
})
