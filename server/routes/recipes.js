import { Router } from 'express'
import db from '../db.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateBody, validateQuery } from '../middleware/validate.js'
import { recipeSchema, recipeBulkSchema, paginationSchema } from '../schemas/recipe.js'

const router = Router()

router.get('/', authMiddleware, validateQuery(paginationSchema), (req, res) => {
  try {
    const { page, limit, search, categoryId } = res.locals.query
    const offset = (page - 1) * limit

    let query = 'SELECT id, name, category_id, data FROM recipes'
    let countQuery = 'SELECT COUNT(*) as total FROM recipes'
    const conditions = []
    const params = []

    if (search) {
      conditions.push('name LIKE ?')
      params.push(`%${search}%`)
    }
    if (categoryId) {
      conditions.push('category_id = ?')
      params.push(categoryId)
    }

    if (conditions.length > 0) {
      const where = ' WHERE ' + conditions.join(' AND ')
      query += where
      countQuery += where
    }

    query += ' ORDER BY name LIMIT ? OFFSET ?'

    const total = db.prepare(countQuery).get(...params).total
    const rows = db.prepare(query).all(...params, limit, offset)
    const items = rows.map(r => ({ ...JSON.parse(r.data), id: r.id, name: r.name, categoryId: r.category_id }))

    res.json({ items, total, page, limit })
  } catch (err) {
    console.error('Recipes GET error:', err)
    res.status(500).json({ error: err.message })
  }
})

router.post('/', authMiddleware, validateBody(recipeSchema), (req, res) => {
  const { id, name, categoryId } = req.body
  const data = JSON.stringify(req.body)
  db.prepare(`
    INSERT INTO recipes (id, name, category_id, data) VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET name = ?, category_id = ?, data = ?, updated_at = CURRENT_TIMESTAMP
  `).run(id, name, categoryId || null, data, name, categoryId || null, data)
  res.json({ success: true })
})

router.delete('/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM recipes WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

router.post('/bulk', authMiddleware, validateBody(recipeBulkSchema), (req, res) => {
  const { recipes } = req.body
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

export default router
