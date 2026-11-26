import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { processContactInquiry } from './lib/contactMailer.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/contact', async (req, res) => {
  dotenv.config({ override: true })

  try {
    const result = await processContactInquiry(req.body)
    return res.status(result.status).json(result.body)
  } catch (error) {
    console.error('❌ [Email Send Error]:', error)
    return res.status(500).json({ error: 'Failed to send email. Check SMTP credentials.' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`)
})
