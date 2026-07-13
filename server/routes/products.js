import { Router } from 'express'
import db from '../db.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateBody, validateQuery } from '../middleware/validate.js'
import { productSchema, productBulkSchema, paginationSchema } from '../schemas/product.js'

const router = Router()

router.get('/', authMiddleware, validateQuery(paginationSchema), (req, res) => {
  const { page, limit, search, category } = req.query
  const offset = (page - 1) * limit

  let query = 'SELECT id, name, category, icon, data FROM products'
  let countQuery = 'SELECT COUNT(*) as total FROM products'
  const conditions = []
  const params = []

  if (search) {
    conditions.push('name LIKE ?')
    params.push(`%${search}%`)
  }
  if (category) {
    conditions.push('category = ?')
    params.push(category)
  }

  if (conditions.length > 0) {
    const where = ' WHERE ' + conditions.join(' AND ')
    query += where
    countQuery += where
  }

  query += ' ORDER BY name LIMIT ? OFFSET ?'

  const total = db.prepare(countQuery).get(...params).total
  const rows = db.prepare(query).all(...params, limit, offset)
  const items = rows.map(r => ({ ...JSON.parse(r.data), id: r.id, name: r.name, category: r.category, icon: r.icon }))

  res.json({ items, total, page, limit })
})

router.post('/', authMiddleware, validateBody(productSchema), (req, res) => {
  const { id, name, category, icon = '📦' } = req.body
  const data = JSON.stringify(req.body)
  db.prepare(`
    INSERT INTO products (id, name, category, icon, data) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET name = ?, category = ?, icon = ?, data = ?, updated_at = CURRENT_TIMESTAMP
  `).run(id, name, category, icon, data, name, category, icon, data)
  res.json({ success: true })
})

router.delete('/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

router.post('/bulk', authMiddleware, validateBody(productBulkSchema), (req, res) => {
  const { products } = req.body
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

export default router
