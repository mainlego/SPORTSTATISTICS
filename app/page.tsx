'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const sports = [
  'Football', 'Basketball', 'Tennis', 'Baseball', 'Hockey',
  'Cricket', 'Rugby', 'Golf', 'Boxing', 'MMA'
]

const features = [
  {
    title: 'Real-time Data',
    description: 'Get instant access to live match statistics and scores',
    icon: '⚡'
  },
  {
    title: 'Historical Records',
    description: 'Access comprehensive historical data for analysis',
    icon: '📊'
  },
  {
    title: 'Multiple Sports',
    description: '10+ sports covered with detailed statistics',
    icon: '🏆'
  },
  {
    title: 'RESTful API',
    description: 'Easy integration with clean and documented endpoints',
    icon: '🔌'
  },
  {
    title: '99.9% Uptime',
    description: 'Reliable service with enterprise-level availability',
    icon: '✅'
  },
  {
    title: 'Secure Access',
    description: 'API key authentication with encrypted connections',
    icon: '🔒'
  }
]

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleTrialRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/trial-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('✅ Trial request sent! Check your email for the trial link.')
        setEmail('')

        // In development, show the trial link directly
        if (result.trialLink) {
          setMessage(`✅ Trial link: ${result.trialLink}`)
        }
      } else {
        setMessage(`❌ ${result.error || 'Failed to send request. Please try again.'}`)
      }
    } catch (error) {
      setMessage('❌ Failed to send request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SportsStats
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/docs" className="text-gray-700 hover:text-blue-600 font-medium transition">
                API Docs
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Dashboard
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                <Link
                  href="/docs"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  API Docs
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block mx-3 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium text-center hover:shadow-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Premium Sports
            </span>
            <span className="block">Statistics API</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access comprehensive sports data for 10+ sports. Real-time scores,
            historical statistics, and detailed match analytics at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Start Free Trial →
            </Link>
            <Link
              href="/docs"
              className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:shadow-xl transition-all border border-gray-200"
            >
              📖 View Documentation
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {sports.map((sport) => (
              <span
                key={sport}
                className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-700 border border-gray-200"
              >
                {sport}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">10+</div>
              <div className="text-gray-600 mt-2 font-medium">Sports Covered</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">50K+</div>
              <div className="text-gray-600 mt-2 font-medium">Matches Daily</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-gray-600 mt-2 font-medium">Uptime SLA</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">100ms</div>
              <div className="text-gray-600 mt-2 font-medium">Avg Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Why Choose SportsStats API
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Built for developers, trusted by businesses worldwide
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all group hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-12">
            One plan, unlimited access to all sports data
          </p>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-1 rounded-bl-xl text-sm font-bold">
              BEST VALUE
            </div>
            <div className="mb-8">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                $2,400 USDT
              </div>
              <div className="text-gray-600 text-lg">per year</div>
            </div>

            <ul className="text-left max-w-sm mx-auto mb-8 space-y-3">
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-900 font-medium">Unlimited API calls</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-900 font-medium">Access to all 10+ sports</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-900 font-medium">Real-time & historical data</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-900 font-medium">Premium support</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-900 font-medium">99.9% uptime guarantee</span>
              </li>
            </ul>

            <Link
              href="/register"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
            >
              Get Started Now
            </Link>

            <p className="text-sm text-gray-500 mt-4">
              Secure payment via cryptocurrency (NOWPayments)
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of developers using our API
          </p>

          <form onSubmit={handleTrialRequest} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 w-full sm:w-80"
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !email}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Start Free Trial'}
            </button>
          </form>

          {message && (
            <div className="mt-6 max-w-md mx-auto p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-white text-center font-medium">{message}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-xl font-bold">SportsStats</span>
              </div>
              <p className="text-gray-400">Premium sports statistics API for developers</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-white transition">Documentation</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
                <li><Link href="/register" className="hover:text-white transition">Get Started</Link></li>
                <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Sports Coverage</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Football (NFL, Soccer)</li>
                <li>Basketball (NBA)</li>
                <li>Tennis (ATP, WTA)</li>
                <li>And 7+ more sports</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@sportsstats.api</li>
                <li>Response time: &lt; 24 hours</li>
                <li>Premium support included</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
            <p>&copy; 2024 SportsStats API. All rights reserved.</p>
            <p className="mt-2 text-sm">Secure payments via NOWPayments (Cryptocurrency)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}