import { NextResponse } from 'next/server'
import { count } from 'drizzle-orm'
import { db } from '@/lib/db'
import { user } from '@/lib/auth-schema'

export async function GET() {
  try {
    const [row] = await db.select({ count: count() }).from(user)
    return NextResponse.json({ count: row?.count ?? 0 })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
