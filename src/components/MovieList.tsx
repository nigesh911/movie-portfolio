import { Movie } from '@/types/movie'
import Image from 'next/image'

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return <p>No movies to display</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.id} className="flex flex-col items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            className="rounded-lg"
          />
          <h2 className="mt-2 text-center">{movie.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default MovieList
