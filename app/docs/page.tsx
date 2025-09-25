'use client'

import { useState } from 'react'
import Link from 'next/link'

const API_ENDPOINTS = [
  {
    method: 'GET',
    endpoint: '/api/v1/sports',
    description: 'Get list of all available sports',
    parameters: [],
    example: {
      response: {
        "success": true,
        "data": {
          "sports": [
            {
              "id": "football",
              "name": "Football",
              "description": "American Football statistics",
              "leagues": ["NFL", "NCAA", "CFL"],
              "endpoints": ["GET /api/v1/sports/football/matches"]
            }
          ],
          "total_sports": 10
        }
      }
    }
  },
  {
    method: 'GET',
    endpoint: '/api/v1/sports/{sport}/matches',
    description: 'Get matches for a specific sport',
    parameters: [
      { name: 'sport', type: 'string', required: true, description: 'Sport ID (football, basketball, tennis, etc.)' },
      { name: 'limit', type: 'integer', required: false, description: 'Number of results to return (default: 20)' },
      { name: 'offset', type: 'integer', required: false, description: 'Number of results to skip (default: 0)' },
      { name: 'status', type: 'string', required: false, description: 'Match status (live, completed, scheduled)' },
      { name: 'league', type: 'string', required: false, description: 'Filter by league' },
      { name: 'date', type: 'string', required: false, description: 'Filter by date (YYYY-MM-DD)' }
    ],
    example: {
      response: {
        "success": true,
        "data": {
          "matches": [
            {
              "id": "nfl_2024_001",
              "date": "2024-09-08T20:00:00Z",
              "status": "completed",
              "league": "NFL",
              "home_team": {
                "name": "Buffalo Bills",
                "score": 31
              },
              "away_team": {
                "name": "Miami Dolphins",
                "score": 10
              }
            }
          ]
        }
      }
    }
  },
  {
    method: 'GET',
    endpoint: '/api/v1/sports/{sport}/matches/{matchId}',
    description: 'Get detailed information for a specific match',
    parameters: [
      { name: 'sport', type: 'string', required: true, description: 'Sport ID' },
      { name: 'matchId', type: 'string', required: true, description: 'Match ID' }
    ],
    example: {
      response: {
        "success": true,
        "data": {
          "id": "nfl_2024_001",
          "status": "completed",
          "scoring_summary": [],
          "team_statistics": {},
          "player_statistics": {}
        }
      }
    }
  }
]

const CODE_EXAMPLES = {
  curl: `curl -H "X-API-Key: your_api_key" \\
     https://api.sportsstats.com/api/v1/sports/football/matches`,

  javascript: `const response = await fetch('https://api.sportsstats.com/api/v1/sports/football/matches', {
  headers: {
    'X-API-Key': 'your_api_key'
  }
});
const data = await response.json();`,

  python: `import requests

headers = {
    'X-API-Key': 'your_api_key'
}

response = requests.get(
    'https://api.sportsstats.com/api/v1/sports/football/matches',
    headers=headers
)
data = response.json()`,

  php: `<?php
$headers = [
    'X-API-Key: your_api_key'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.sportsstats.com/api/v1/sports/football/matches');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);
?>`
}

export default function DocsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('curl')
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SportsStats API
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
                Dashboard
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get API Key
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-24">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection('overview')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      activeSection === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('authentication')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      activeSection === 'authentication' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Authentication
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('endpoints')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      activeSection === 'endpoints' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    API Endpoints
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('examples')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      activeSection === 'examples' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Code Examples
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('errors')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      activeSection === 'errors' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Error Handling
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-8">
                {activeSection === 'overview' && (
                  <div>
                    <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
                    <p className="text-lg text-gray-600 mb-6">
                      Welcome to the SportsStats API documentation. Our API provides comprehensive sports statistics
                      for 10+ major sports including real-time data, historical records, and detailed analytics.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Base URL</h3>
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                          https://api.sportsstats.com
                        </code>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Response Format</h3>
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                          JSON
                        </code>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-4">Supported Sports</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Football', 'Basketball', 'Tennis', 'Baseball', 'Hockey', 'Cricket', 'Rugby', 'Golf', 'Boxing', 'MMA'].map((sport) => (
                        <div key={sport} className="p-3 bg-gray-50 rounded-lg text-center">
                          {sport}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'authentication' && (
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Authentication</h1>
                    <p className="text-gray-600 mb-6">
                      All API requests require authentication using an API key. You can obtain your API key
                      by creating an account and purchasing a subscription.
                    </p>

                    <h2 className="text-2xl font-bold mb-4">API Key Usage</h2>
                    <p className="text-gray-600 mb-4">
                      Include your API key in the request header:
                    </p>

                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
                      <code>X-API-Key: your_api_key_here</code>
                    </div>

                    <p className="text-gray-600 mb-4">
                      Alternatively, you can use the Authorization header:
                    </p>

                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
                      <code>Authorization: Bearer your_api_key_here</code>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-800 mb-2">Important</h3>
                      <p className="text-yellow-700">
                        Keep your API key secure and never expose it in client-side code.
                        All API requests should be made from your server.
                      </p>
                    </div>
                  </div>
                )}

                {activeSection === 'endpoints' && (
                  <div>
                    <h1 className="text-3xl font-bold mb-6">API Endpoints</h1>

                    {API_ENDPOINTS.map((endpoint, index) => (
                      <div key={index} className="mb-8 border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                            {endpoint.method}
                          </span>
                          <code className="text-lg font-mono">{endpoint.endpoint}</code>
                        </div>

                        <p className="text-gray-600 mb-4">{endpoint.description}</p>

                        {endpoint.parameters.length > 0 && (
                          <div className="mb-4">
                            <h3 className="font-semibold mb-2">Parameters</h3>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="text-left p-2 font-semibold">Name</th>
                                    <th className="text-left p-2 font-semibold">Type</th>
                                    <th className="text-left p-2 font-semibold">Required</th>
                                    <th className="text-left p-2 font-semibold">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {endpoint.parameters.map((param, i) => (
                                    <tr key={i} className="border-t border-gray-200">
                                      <td className="p-2 font-mono">{param.name}</td>
                                      <td className="p-2">{param.type}</td>
                                      <td className="p-2">
                                        {param.required ? (
                                          <span className="text-red-600">Yes</span>
                                        ) : (
                                          <span className="text-gray-500">No</span>
                                        )}
                                      </td>
                                      <td className="p-2">{param.description}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        <div>
                          <h3 className="font-semibold mb-2">Example Response</h3>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{JSON.stringify(endpoint.example.response, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === 'examples' && (
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Code Examples</h1>
                    <p className="text-gray-600 mb-6">
                      Here are examples of how to make requests to our API in different programming languages.
                    </p>

                    <div className="mb-6">
                      <div className="flex gap-2 mb-4">
                        {Object.keys(CODE_EXAMPLES).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setSelectedLanguage(lang)}
                            className={`px-4 py-2 rounded-lg transition ${
                              selectedLanguage === lang
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </button>
                        ))}
                      </div>

                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>{CODE_EXAMPLES[selectedLanguage as keyof typeof CODE_EXAMPLES]}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {activeSection === 'errors' && (
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Error Handling</h1>
                    <p className="text-gray-600 mb-6">
                      Our API uses standard HTTP status codes to indicate success or failure of requests.
                    </p>

                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">200</span>
                          <span className="font-semibold">OK</span>
                        </div>
                        <p className="text-gray-600">Request successful</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">401</span>
                          <span className="font-semibold">Unauthorized</span>
                        </div>
                        <p className="text-gray-600">Invalid or missing API key</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">403</span>
                          <span className="font-semibold">Forbidden</span>
                        </div>
                        <p className="text-gray-600">Subscription expired or insufficient permissions</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">404</span>
                          <span className="font-semibold">Not Found</span>
                        </div>
                        <p className="text-gray-600">Resource not found</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">500</span>
                          <span className="font-semibold">Internal Server Error</span>
                        </div>
                        <p className="text-gray-600">Something went wrong on our end</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h2 className="text-2xl font-bold mb-4">Error Response Format</h2>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{JSON.stringify({
                          "error": "Unauthorized",
                          "message": "Invalid API key provided",
                          "timestamp": "2024-09-25T12:00:00Z"
                        }, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}