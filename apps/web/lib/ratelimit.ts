import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Per-IP sliding-window limiter for the public waitlist endpoint. The waitlist
// route calls auth.api.signUpEmail() server-side, which bypasses Better Auth's
// own rate limiter, so it needs its own protection against scripted spam.
//
// Returns null when Upstash isn't configured (e.g. local dev without the env
// vars) so the endpoint degrades to "no rate limiting" rather than crashing.
function createRatelimit(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    prefix: 'ratelimit:waitlist',
    analytics: true,
  })
}

export const waitlistRatelimit = createRatelimit()
