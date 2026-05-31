import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { waitlistRatelimit } from '@/lib/ratelimit'

function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  // x-forwarded-for may be a comma-separated list; the first entry is the client.
  return forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || '127.0.0.1'
}

export async function POST(req: Request) {
  // Per-IP rate limiting (no-op if Upstash isn't configured locally).
  if (waitlistRatelimit) {
    const { success, reset } = await waitlistRatelimit.limit(clientIp(req))
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000))
      return NextResponse.json(
        { error: 'rate_limited' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } },
      )
    }
  }

  const body = await req.json().catch(() => null)
  const email: string = body?.email?.trim() ?? ''
  const honeypot: string = body?.company?.trim() ?? ''

  // Honeypot: a real user never fills the hidden "company" field. Silently
  // accept so the bot gets no signal, but skip the signup.
  if (honeypot) {
    return NextResponse.json({ ok: true })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: email.split('@')[0],
        email,
        password: crypto.randomUUID(),
      },
    })
    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    const msg = String(error)
    // Treat duplicate email as success — no enumeration
    if (msg.includes('UNIQUE') || msg.toLowerCase().includes('already exists')) {
      return NextResponse.json({ ok: true })
    }
    console.error('[waitlist]', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
