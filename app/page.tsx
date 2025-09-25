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

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SportsStats API
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/docs" className="text-gray-700 hover:text-blue-600 transition">
                Documentation
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition">
                Pricing
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Sports Statistics
            <span className="block text-blue-600">API Service</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access comprehensive sports data for 10+ sports. Real-time scores,
            historical statistics, and detailed match analytics at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              href="/docs"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              View Documentation
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">10+</div>
              <div className="text-gray-600 mt-2">Sports Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600 mt-2">Matches Daily</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">99.9%</div>
              <div className="text-gray-600 mt-2">Uptime SLA</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">100ms</div>
              <div className="text-gray-600 mt-2">Avg Response Time</div>
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
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                $2,400 USDT
              </div>
              <div className="text-gray-600">per year</div>
            </div>

            <ul className="text-left max-w-sm mx-auto mb-8 space-y-3">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Unlimited API calls
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Access to all 10+ sports
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Real-time & historical data
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Premium support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                99.9% uptime guarantee
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-lg text-gray-900 w-full sm:w-80"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/api-status">API Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Sports</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Football</li>
                <li>Basketball</li>
                <li>Tennis</li>
                <li>More...</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/sla">SLA</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-600 pt-8 border-t border-gray-200">
            <p>&copy; 2024 SportsStats API. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}