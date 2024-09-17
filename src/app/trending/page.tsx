'use client'

import { useState, useEffect } from 'react'
import MovieCard from '@/components/MovieCard'
import { fetchTrendingMovies } from '@/lib/tmdb'
import { Movie } from '@/types/movie'

export default function Trending() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies()
        setMovies(trendingMovies)
      } catch (error) {
        console.error('Error loading trending movies:', error)
        setError('Failed to load trending movies. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    loadTrendingMovies()
  }, [])

  const handleAddToWatched = (movie: Movie) => {
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies') || '[]')
    if (!watchedMovies.some((m: Movie) => m.id === movie.id)) {
      const updatedWatchedMovies = [...watchedMovies, movie]
      localStorage.setItem('watchedMovies', JSON.stringify(updatedWatchedMovies))
      console.log(`Added movie ${movie.title} to watched list`)
    } else {
      console.log(`Movie ${movie.title} is already in the watched list`)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Trending Movies</h1>
      {movies.length === 0 ? (
        <p>No trending movies available at the moment.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onAddToWatched={handleAddToWatched} />
          ))}
        </div>
      )}
    </div>
  )
}