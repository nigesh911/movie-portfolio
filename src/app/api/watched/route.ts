import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// This is a placeholder. In a real app, you'd interact with a database here.
const watchedMovies = new Map()

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userMovies = watchedMovies.get(session.user?.email) || []
  return NextResponse.json(userMovies)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { movieId } = await request.json()
  
  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 })
  }

  if (!session.user?.email) {
    return NextResponse.json({ error: 'User email not found' }, { status: 400 })
  }

  const userMovies = watchedMovies.get(session.user.email) || []
  userMovies.push(movieId)
  watchedMovies.set(session.user.email, userMovies)

  return NextResponse.json({ success: true })
}