import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res) => {
  res.json({ ok: true, query: req.query })
})

app.listen(3098, () => {
  console.log('Debug server on 3098')
})
