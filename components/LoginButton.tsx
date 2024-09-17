import { signIn } from "next-auth/react"

export default function LoginButton() {
  return (
    <div className="flex flex-col space-y-2">
      <button 
        onClick={() => signIn("github")}
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        Sign in with GitHub
      </button>
      <button 
        onClick={() => signIn("google")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  )
}