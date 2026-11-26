import { processContactInquiry } from '../lib/contactMailer.js'

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    const result = await processContactInquiry(body)
    return res.status(result.status).json(result.body)
  } catch (error) {
    console.error('❌ [Email Send Error]:', error)
    return res.status(500).json({ error: 'Failed to send email. Check SMTP credentials.' })
  }
}
