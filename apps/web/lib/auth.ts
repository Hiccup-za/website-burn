import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import type { BetterAuthOptions } from 'better-auth'
import { db } from './db'

// Only register the GitHub provider when credentials are actually present.
// Otherwise Better Auth logs a "missing clientId or clientSecret" warning on
// every init. With this gate the provider auto-activates once the env vars are
// set (locally or on Vercel) — no code change needed.
const socialProviders: BetterAuthOptions['socialProviders'] =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : undefined

// Resolve the canonical base URL. In production this MUST be set explicitly
// (BETTER_AUTH_URL) or derived from Vercel's deployment URL — falling back to
// localhost in production silently breaks secure cookies and CSRF checks.
function resolveBaseURL(): string | undefined {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:3015'
  return undefined // let Better Auth infer from request headers, or fail loudly
}

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  baseURL: resolveBaseURL(),
  secret: process.env.BETTER_AUTH_SECRET!,
  emailAndPassword: { enabled: true },
  socialProviders,
  // Built-in rate limiting protects the public /api/auth/* surface. Memory
  // storage is per-instance and useless on Vercel serverless, so persist to
  // the database. NOTE: this does NOT cover /api/waitlist, which calls
  // auth.api.signUpEmail() server-side and bypasses this limiter — that route
  // is rate limited separately via Upstash (see lib/ratelimit.ts).
  rateLimit: {
    enabled: true,
    storage: 'database',
    window: 60,
    max: 100,
    customRules: {
      '/sign-in/email': { window: 10, max: 5 },
      '/sign-up/email': { window: 60, max: 5 },
    },
  },
})
