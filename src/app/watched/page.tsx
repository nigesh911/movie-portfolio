'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import MovieCard from '@/components/MovieCard'
import { searchMovies } from '@/lib/tmdb'
import { Movie } from '@/types/movie'
import { Combobox } from '@headlessui/react'

interface WatchedMovie extends Movie {
  review?: string;
}

export default function Watched() {
  const { data: session } = useSession()
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovie[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [shareUrl, setShareUrl] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const storedMovies = localStorage.getItem('watchedMovies')
    if (storedMovies) {
      setWatchedMovies(JSON.parse(storedMovies))
    }
  }, [])

  useEffect(() => {
    if (window.location.hash === '#share') {
      handleShare()
    }
  }, [watchedMovies])

  const handleSearch = async (value: string) => {
    setSearchTerm(value)
    if (value.length > 2) {
      const results = await searchMovies(value)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleAddToWatched = (movie: Movie) => {
    if (!watchedMovies.some(m => m.id === movie.id)) {
      const updatedWatchedMovies = [...watchedMovies, { ...movie, review: '' }]
      setWatchedMovies(updatedWatchedMovies)
      localStorage.setItem('watchedMovies', JSON.stringify(updatedWatchedMovies))
    }
    setSearchTerm('')
    setSearchResults([])
    setSelectedMovie(null)
  }

  const handleReviewChange = (movieId: number, review: string) => {
    const updatedMovies = watchedMovies.map(movie => 
      movie.id === movieId ? { ...movie, review } : movie
    )
    setWatchedMovies(updatedMovies)
    localStorage.setItem('watchedMovies', JSON.stringify(updatedMovies))
  }

  const handleShare = () => {
    const shareData = {
      userId: session?.user?.name || 'Anonymous',
      movies: watchedMovies.map(movie => ({
        id: movie.id,
        title: movie.title,
        review: movie.review
      }))
    }
    const shareString = btoa(JSON.stringify(shareData))
    const url = `${window.location.origin}/shared/${shareString}`
    setShareUrl(url)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Watched Movies</h1>
      <Combobox value={selectedMovie} onChange={setSelectedMovie}>
        <Combobox.Input
          className="w-full p-2 border rounded text-gray-800"
          placeholder="Search for movies"
          onChange={(event) => handleSearch(event.target.value)}
          displayValue={(movie: Movie | null) => movie?.title || ''}
        />
        <Combobox.Options className="mt-1 max-h-60 overflow-auto bg-gray-800 border rounded">
          {searchResults.map((movie) => (
            <Combobox.Option key={movie.id} value={movie}>
              {({ active }) => (
                <div className={`p-2 ${active ? 'bg-blue-500 text-white' : 'text-gray-300'}`}>
                  {movie.title}
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      {selectedMovie && (
        <button
          onClick={() => handleAddToWatched(selectedMovie)}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Add to Watched
        </button>
      )}
      <h2 className="text-2xl font-bold mt-8 mb-4">Your Watched List</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {watchedMovies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            review={movie.review}
            onReviewChange={handleReviewChange}
          />
        ))}
      </div>
      <div className="mt-8">
        <button
          onClick={handleShare}
          className="p-2 bg-green-500 text-white rounded"
        >
          Generate Share URL
        </button>
        {shareUrl && (
          <div className="mt-4">
            <p>Share this URL with your friends:</p>
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-grow p-2 border rounded-l"
              />
              <button
                onClick={handleCopyUrl}
                className="p-2 bg-blue-500 text-white rounded-r"
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}