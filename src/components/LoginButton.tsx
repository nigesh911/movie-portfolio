'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm">{session.user?.name}</span>
        <button 
          onClick={() => signOut()}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => signIn("github")}
      className="bg-gray-600 text-white px-2 py-1 rounded text-sm"
    >
      Sign in with GitHub
    </button>
  )
}
