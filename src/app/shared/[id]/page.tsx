'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import MovieCard from '@/components/MovieCard'

interface SharedMovie {
  id: number;
  title: string;
  review?: string;
}

interface SharedData {
  userId: string;
  movies: SharedMovie[];
}

export default function SharedList() {
  const params = useParams()
  const [sharedData, setSharedData] = useState<SharedData | null>(null)

  useEffect(() => {
    if (params.id) {
      try {
        const decodedData = JSON.parse(atob(params.id as string))
        setSharedData(decodedData)
      } catch (error) {
        console.error('Error decoding shared data:', error)
      }
    }
  }, [params.id])

  if (!sharedData) {
    return <div>Loading shared list...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shared Watched List</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sharedData.movies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{movie.title}</h2>
            {movie.review && <p className="mt-2">{movie.review}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}