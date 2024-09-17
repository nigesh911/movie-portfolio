import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // In a real app, you'd generate a unique, secure share link here
  const shareLink = `https://movieportfolio.com/share/${session.user?.name ?? 'anonymous'}`

  return NextResponse.json({ shareLink })
}