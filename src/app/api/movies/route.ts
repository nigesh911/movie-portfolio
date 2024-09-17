import { NextResponse } from 'next/server'
import { fetchPopularMovies } from '@/lib/tmdb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  
  try {
    const movies = await fetchPopularMovies(parseInt(page))
    return NextResponse.json(movies)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 })
  }
}