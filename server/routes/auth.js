import { Router } from 'express'
import bcrypt from 'bcryptjs'
import rateLimit from 'express-rate-limit'
import db from '../db.js'
import { authMiddleware, signAccessToken, signRefreshToken, JWT_REFRESH_SECRET } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { registerSchema, loginSchema, changePasswordSchema, refreshTokenSchema } from '../schemas/auth.js'
import jwt from 'jsonwebtoken'

const router = Router()

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Занадто багато спроб. Спробуйте через хвилину.' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/register', authLimiter, validateBody(registerSchema), (req, res) => {
  const { username, email, password } = req.body

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
  const user = { id: result.lastInsertRowid, username, role: 'user' }
  const token = signAccessToken(user)
  const refreshToken = signRefreshToken(user)

  db.prepare('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)').run(
    user.id,
    refreshToken,
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  )

  res.json({ token, refreshToken, user: { id: user.id, username, email: email || null, role: 'user' } })
})

router.post('/login', authLimiter, validateBody(loginSchema), (req, res) => {
  const { username, password } = req.body

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Невірний логін або пароль' })
  }

  const token = signAccessToken({ id: user.id, username: user.username, role: user.role })
  const refreshToken = signRefreshToken({ id: user.id, username: user.username, role: user.role })

  db.prepare('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)').run(
    user.id,
    refreshToken,
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  )

  res.json({ token, refreshToken, user: { id: user.id, username: user.username, email: user.email, role: user.role } })
})

router.post('/refresh', validateBody(refreshTokenSchema), (req, res) => {
  const { refreshToken } = req.body

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
    const stored = db.prepare('SELECT token FROM refresh_tokens WHERE token = ? AND expires_at > datetime(\'now\')').get(refreshToken)
    if (!stored) {
      return res.status(401).json({ error: 'Недійсний refresh токен' })
    }

    const user = db.prepare('SELECT id, username, email, role FROM users WHERE id = ?').get(decoded.id)
    if (!user) {
      return res.status(401).json({ error: 'Користувача не знайдено' })
    }

    const newToken = signAccessToken(user)
    res.json({ token: newToken })
  } catch {
    return res.status(401).json({ error: 'Недійсний refresh токен' })
  }
})

router.post('/logout', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM refresh_tokens WHERE user_id = ?').run(req.user.id)
  res.json({ success: true })
})

router.get('/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, username, email, role, created_at FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ error: 'Користувача не знайдено' })
  res.json({ user })
})

router.post('/change-password', authMiddleware, validateBody(changePasswordSchema), (req, res) => {
  const { currentPassword, newPassword } = req.body
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(401).json({ error: 'Невірний поточний пароль' })
  }
  const hash = bcrypt.hashSync(newPassword, 10)
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, user.id)
  res.json({ success: true })
})

export default router
