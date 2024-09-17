import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { Providers } from '@/components/Providers'
import Navbar from '@/components/Navbar'  // Changed this line
import Footer from '@/components/Footer'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'  // We'll create this component

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Portfolio',
  description: 'Your personal movie collection and reviews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}