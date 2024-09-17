'use client'

import { useState } from 'react'

interface ReviewFormProps {
  movieId: number
}

export default function ReviewForm({ movieId }: ReviewFormProps) {
  const [review, setReview] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement review submission logic here
    console.log(`Submitting review for movie ${movieId}: ${review}`)
    setReview('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 border rounded"
        rows={4}
      />
      <button
        type="submit"
        className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Submit Review
      </button>
    </form>
  )
}