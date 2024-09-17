'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = params?.id
    if (typeof id === 'string') {
      try {
        const decodedData = JSON.parse(atob(id))
        setSharedData(decodedData)
      } catch (error) {
        console.error('Error decoding shared data:', error)
        setError('Failed to decode shared data. The link might be invalid.')
      }
    } else {
      setError('Invalid shared list ID')
    }
  }, [params])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

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