'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginButton from './LoginButton'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Movies HUB
        </Link>
        <div className="space-x-4 flex items-center">
          <Link
            href="/"
            className={pathname === '/' ? 'text-blue-400' : 'hover:text-blue-400'}
          >
            Home
          </Link>
          <Link
            href="/trending"
            className={pathname === '/trending' ? 'text-blue-400' : 'hover:text-blue-400'}
          >
            Trending
          </Link>
          <Link
            href="/watched"
            className={pathname === '/watched' ? 'text-blue-400' : 'hover:text-blue-400'}
          >
            Watched
          </Link>
          <Link
            href="/watched#share"
            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
          >
            Share List
          </Link>
          <LoginButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
