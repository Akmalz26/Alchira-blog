'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">
              Alchira
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`relative font-medium transition-colors group ${
                pathname === '/' 
                  ? 'text-pink-500' 
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              Home
              <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-pink-300 transition-transform origin-left ${
                pathname === '/' 
                  ? 'scale-x-100' 
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            <Link 
              href="/blog" 
              className={`relative font-medium transition-colors group ${
                pathname?.startsWith('/blog') 
                  ? 'text-pink-500' 
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              Blog
              <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-pink-300 transition-transform origin-left ${
                pathname?.startsWith('/blog') 
                  ? 'scale-x-100' 
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            <Link 
              href="/about" 
              className={`relative font-medium transition-colors group ${
                pathname === '/about' 
                  ? 'text-pink-500' 
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              About
              <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-pink-300 transition-transform origin-left ${
                pathname === '/about' 
                  ? 'scale-x-100' 
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            <Link 
              href="/contact" 
              className={`relative font-medium transition-colors group ${
                pathname === '/contact' 
                  ? 'text-pink-500' 
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              Contact
              <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-pink-300 transition-transform origin-left ${
                pathname === '/contact' 
                  ? 'scale-x-100' 
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className={`font-medium transition-colors ${
                    pathname?.startsWith('/profile')
                      ? 'text-pink-500'
                      : 'text-gray-700 hover:text-pink-500'
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-pink-500 hover:bg-pink-50 transition-all font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-gradient text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  pathname === '/' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className={`font-medium transition-colors ${
                  pathname?.startsWith('/blog') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className={`font-medium transition-colors ${
                  pathname === '/about' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`font-medium transition-colors ${
                  pathname === '/contact' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className={`font-medium transition-colors ${
                      pathname?.startsWith('/profile') ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="text-left text-gray-700 hover:text-pink-500 transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn-gradient text-white px-6 py-2 rounded-lg font-medium inline-block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

