'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PricingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleTrialRequest = async (e: React.FormEvent) => {
    e.preventDefault()
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SportsStats
              </span>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Home
              </Link>
              <Link href="/docs" className="text-gray-700 hover:text-blue-600 font-medium transition">
                API Docs
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all">
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
                  href="/"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/docs"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  API Docs
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

      {/* Pricing Content */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simple Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            One plan, complete access to all sports data
          </p>

          <div className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-1 rounded-bl-xl text-sm font-bold">
              ANNUAL PLAN
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
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-900 font-medium">Webhook support</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-900 font-medium">Custom rate limits</span>
              </li>
            </ul>

            <Link
              href="/register"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Get Started Now →
            </Link>

            <p className="text-sm text-gray-500 mt-6">
              Secure payment via cryptocurrency (NOWPayments)
              <br />
              Instant activation after payment confirmation
            </p>
          </div>

          {/* Trial Request Form */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Want to try before you buy?
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Request a free 7-day trial link sent directly to your email
            </p>

            <form onSubmit={handleTrialRequest} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Request Trial'}
                </button>
              </div>

              {message && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-800 font-medium">{message}</p>
                </div>
              )}
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Trial links are valid for 24 hours and include full API access
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}