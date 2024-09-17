import { useState } from 'react'
import { Movie } from '@/types/movie'
import Image from 'next/image'

interface MovieCardProps {
  movie: Movie;
  onAddToWatched?: (movie: Movie) => void;
  review?: string;
  onReviewChange?: (movieId: number, review: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onAddToWatched, review, onReviewChange }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tempReview, setTempReview] = useState(review || '')

  const handleReviewSubmit = () => {
    if (onReviewChange) {
      onReviewChange(movie.id, tempReview)
    }
    setIsEditing(false)
  }

  return (
    <div 
      className="flex flex-col items-center relative transition-transform duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
        className="rounded-lg shadow-lg"
      />
      {onReviewChange && isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 rounded-b-lg">
          {isEditing ? (
            <>
              <textarea
                value={tempReview}
                onChange={(e) => setTempReview(e.target.value)}
                className="w-full bg-transparent text-white"
              />
              <button onClick={handleReviewSubmit} className="mt-2 text-sm bg-blue-500 px-2 py-1 rounded">Save</button>
            </>
          ) : (
            <>
              <p className="text-sm">{review || 'No review yet'}</p>
              <button onClick={() => setIsEditing(true)} className="mt-2 text-sm bg-blue-500 px-2 py-1 rounded">Edit Review</button>
            </>
          )}
        </div>
      )}
      <h2 className="mt-2 text-center font-semibold">{movie.title}</h2>
      {onAddToWatched && (
        <button 
          onClick={() => onAddToWatched(movie)} 
          className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Add to Watched
        </button>
      )}
    </div>
  )
}

export default MovieCard