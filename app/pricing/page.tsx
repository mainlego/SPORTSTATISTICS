'use client'

import Link from 'next/link'

export default function PricingPage() {
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
            <div className="flex items-center space-x-6">
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
          </div>
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
        </div>
      </div>
    </div>
  )
}