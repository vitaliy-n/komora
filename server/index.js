import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.js'
import canningRoutes from './routes/cannings.js'
import inventoryRoutes from './routes/inventory.js'
import productRoutes from './routes/products.js'
import recipeRoutes from './routes/recipes.js'
import adminRoutes from './routes/admin.js'
import { authMiddleware } from './middleware/auth.js'
import db from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3001

const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3001')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

const app = express()

app.use(cors({
  origin: corsOrigins.length > 0 ? corsOrigins : true,
  credentials: true,
}))
app.use(express.json({ limit: '50mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/cannings', canningRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/recipes', recipeRoutes)
app.use('/api/admin', adminRoutes)

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

const distPath = path.join(__dirname, '..', 'dist')
app.use(express.static(distPath))

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Komora server running on http://localhost:${PORT}`)
})
