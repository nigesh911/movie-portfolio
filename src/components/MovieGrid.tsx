import MovieCard from './MovieCard'

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieGridProps {
  movies: Movie[];
  onAddToWatched: (movieId: number) => void;
}

export default function MovieGrid({ movies, onAddToWatched }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onAddToWatched={onAddToWatched} />
      ))}
    </div>
  )
}