import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './auth-schema'

// Neon pooled connection on serverless: disable prepared statements
// (pgBouncer transaction mode doesn't support them) and cap the pool at 1
// connection per function instance to avoid exhausting Neon's limits.
const client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

// Pass the schema so Better Auth's Drizzle adapter can resolve its models
// (user/session/account/verification/rateLimit) and relational queries work.
export const db = drizzle(client, { schema })
export { client }
