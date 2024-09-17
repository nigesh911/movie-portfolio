'use client'

import { Movie } from '@/types/movie'
import MovieCard from '@/components/MovieCard'
import { fetchPopularMovies } from '@/lib/tmdb'
import { useEffect, useState, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMoreMovies = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    setError(null)
    try {
      const newMovies = await fetchPopularMovies(page)
      if (newMovies.length === 0) {
        setHasMore(false)
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies])
        setPage((prevPage) => prevPage + 1)
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
      setError('Failed to load movies. Please try again later.')
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, page])

  useEffect(() => {
    loadMoreMovies()
  }, [loadMoreMovies])

  const handleAddToWatched = (movie: Movie) => {
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies') || '[]')
    if (!watchedMovies.some((m: Movie) => m.id === movie.id)) {
      const updatedWatchedMovies = [...watchedMovies, movie]
      localStorage.setItem('watchedMovies', JSON.stringify(updatedWatchedMovies))
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Movies You May Like</h1>
      {movies.length === 0 && isLoading ? (
        <div>Loading...</div>
      ) : (
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMoreMovies}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onAddToWatched={handleAddToWatched} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </main>
  )
}