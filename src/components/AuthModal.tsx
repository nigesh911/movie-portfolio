'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)

  const handleGoogleSignIn = () => {
    signIn('google')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sign In / Sign Up</h2>
        <button
          onClick={handleGoogleSignIn}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 w-full p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}