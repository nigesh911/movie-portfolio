'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Share() {
  const { data: session } = useSession()
  const [shareLink, setShareLink] = useState('')

  const generateShareLink = async () => {
    if (session) {
      // In a real application, you would make an API call here
      const dummyLink = `https://movieportfolio.com/share/${session.user?.name}`
      setShareLink(dummyLink)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Share Your Watched List</h1>
      <button 
        onClick={generateShareLink}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Generate Share Link
      </button>
      {shareLink && (
        <div className="mt-4">
          <input 
            type="text"
            value={shareLink}
            readOnly
            className="w-full p-2 border rounded"
          />
          <button
            className="mt-2 p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            onClick={() => navigator.clipboard.writeText(shareLink)}
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  )
}