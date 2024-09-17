import { Movie } from '@/types/movie'
import MovieCard from './MovieCard'

interface MovieGridProps {
  movies: Movie[];
  onAddToWatched: (movie: Movie) => void;  // Change this line
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onAddToWatched }) => {
  if (movies.length === 0) {
    return <p>No movies to display</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onAddToWatched={onAddToWatched} />
      ))}
    </div>
  )
}

export default MovieGrid