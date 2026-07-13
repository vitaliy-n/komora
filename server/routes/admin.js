import { Router } from 'express'
import db from '../db.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/users', authMiddleware, adminMiddleware, (req, res) => {
  const users = db.prepare('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC').all()
  const result = users.map(u => {
    const cannings = db.prepare('SELECT COUNT(*) as count FROM user_cannings WHERE user_id = ?').get(u.id).count
    const inventory = db.prepare('SELECT COUNT(*) as count FROM user_inventory WHERE user_id = ?').get(u.id).count
    return { ...u, canningCount: cannings, inventoryCount: inventory }
  })
  res.json(result)
})

router.put('/users/:id', authMiddleware, adminMiddleware, (req, res) => {
  const { role } = req.body
  if (!role || !['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Невірна роль' })
  }
  db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, req.params.id)
  res.json({ success: true })
})

router.delete('/users/:id', authMiddleware, adminMiddleware, (req, res) => {
  if (Number(req.params.id) === req.user.id) {
    return res.status(400).json({ error: 'Не можна видалити себе' })
  }
  db.prepare('DELETE FROM user_cannings WHERE user_id = ?').run(req.params.id)
  db.prepare('DELETE FROM user_inventory WHERE user_id = ?').run(req.params.id)
  db.prepare('DELETE FROM refresh_tokens WHERE user_id = ?').run(req.params.id)
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

router.get('/stats', authMiddleware, adminMiddleware, (req, res) => {
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

export default router
