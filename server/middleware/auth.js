import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'komora-secret-change-in-production'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'komora-refresh-secret-change-in-production'

export function signAccessToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '15m' },
  )
}

export function signRefreshToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_REFRESH_SECRET,
    { expiresIn: '30d' },
  )
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Не авторизовано' })
  }
  const token = header.slice(7)
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Недійсний токен' })
  }
}

export function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Доступ лише для адміністратора' })
  }
  next()
}

export { JWT_SECRET, JWT_REFRESH_SECRET }
