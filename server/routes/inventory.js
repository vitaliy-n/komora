import { Router } from 'express'
import db from '../db.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { inventorySchema, inventoryBulkSchema } from '../schemas/inventory.js'

const router = Router()

router.get('/', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT id, data FROM user_inventory WHERE user_id = ?').all(req.user.id)
  res.json(rows.map(r => JSON.parse(r.data)))
})

router.post('/', authMiddleware, validateBody(inventorySchema), (req, res) => {
  const { id } = req.body
  const data = JSON.stringify(req.body)
  db.prepare(`
    INSERT INTO user_inventory (id, user_id, data) VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET data = ?, updated_at = CURRENT_TIMESTAMP
  `).run(id, req.user.id, data, data)
  res.json({ success: true })
})

router.post('/bulk', authMiddleware, validateBody(inventoryBulkSchema), (req, res) => {
  const { items } = req.body
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

router.delete('/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM user_inventory WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id)
  res.json({ success: true })
})

export default router
