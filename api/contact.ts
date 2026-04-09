import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { z } from 'zod'

// Initialized lazily inside the handler so a missing key returns a 500, not a crash.
const TO_EMAIL = process.env.TO_EMAIL
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'

const schema = z.object({
  name: z.string().min(2).max(100).transform((v) => v.trim()),
  email: z.string().email().max(200).transform((v) => v.trim().toLowerCase()),
  subject: z.string().max(100).optional().transform((v) => v?.trim()),
  message: z.string().min(10).max(2000).transform((v) => v.trim()),
  honeypot: z.string().max(0, 'Bot detected'), // must be empty
})

// Simple rate limiting — resets per cold start (acceptable for low-traffic sites).
// For persistent rate limiting across instances, use Upstash Redis.
const ipRequests = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipRequests.get(ip)

  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }

  if (entry.count >= 3) return true
  entry.count++
  return false
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN ?? '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  if (!process.env.RESEND_API_KEY || !TO_EMAIL) {
    console.error('[contact] missing required env vars: RESEND_API_KEY, TO_EMAIL')
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const ip =
    ((req.headers['x-forwarded-for'] as string) ?? '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' })
  }

  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    // Honeypot triggered silently — return 200 to not reveal bot detection
    if (parsed.error.issues.some((i) => i.message === 'Bot detected')) {
      return res.status(200).json({ ok: true })
    }
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors })
  }

  const { name, email, subject, message } = parsed.data

  try {
    await resend.emails.send({
      from: `Contact Form <${FROM_EMAIL}>`,
      to: TO_EMAIL as string,
      replyTo: email,
      subject: `New contact: ${subject ?? 'General enquiry'} — from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject ?? '-'}`,
        '',
        message,
      ].join('\n'),
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] email send failed:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}
