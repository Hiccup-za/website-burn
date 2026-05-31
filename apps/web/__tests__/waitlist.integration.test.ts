import { describe, test, expect, afterAll } from 'bun:test'
import { POST } from '../app/api/waitlist/route'
import { db, client } from '../lib/db'
import { user } from '../lib/auth-schema'
import { eq } from 'drizzle-orm'

const TEST_EMAIL = `test-integration-${Date.now()}@example.invalid`
let userId: string | null = null

describe('waitlist signup flow', () => {
  afterAll(async () => {
    // Safety net: remove test user if any step failed before the delete step
    if (userId) {
      await db.delete(user).where(eq(user.id, userId))
    }
    await client.end()
  })

  test('POST creates user and returns 200', async () => {
    const req = new Request('http://localhost:3015/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: TEST_EMAIL }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(true)
  })

  test('user exists in database after signup', async () => {
    const [found] = await db.select().from(user).where(eq(user.email, TEST_EMAIL))
    expect(found).toBeDefined()
    expect(found.email).toBe(TEST_EMAIL)
    userId = found.id
  })

  test('user is removed from database', async () => {
    expect(userId).not.toBeNull()
    await db.delete(user).where(eq(user.id, userId!))
    userId = null
  })

  test('user no longer exists after deletion', async () => {
    const [found] = await db.select().from(user).where(eq(user.email, TEST_EMAIL))
    expect(found).toBeUndefined()
  })
})
