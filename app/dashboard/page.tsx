'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

interface UserData {
  email: string
  name: string
  subscription: {
    status: string
    startDate: string
    endDate: string
  }
  apiKeys: Array<{
    key: string
    name: string
    createdAt: string
    lastUsed?: string
  }>
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [newKeyName, setNewKeyName] = useState('')
  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData)
        }
      } else {
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    await signOut(auth)
    router.push('/')
  }

  const generateApiKey = async () => {
    if (!user || !newKeyName) return

    const newKey = {
      key: `sk_${uuidv4().replace(/-/g, '')}`,
      name: newKeyName,
      createdAt: new Date().toISOString()
    }

    const docRef = doc(db, 'users', user.uid)
    await updateDoc(docRef, {
      apiKeys: arrayUnion(newKey)
    })

    setUserData(prev => prev ? {
      ...prev,
      apiKeys: [...prev.apiKeys, newKey]
    } : null)

    setNewKeyName('')
    setShowNewKeyModal(false)
    setCopiedKey(newKey.key)
    setTimeout(() => setCopiedKey(null), 3000)
  }

  const deleteApiKey = async (keyToDelete: string) => {
    if (!user || !userData) return

    const updatedKeys = userData.apiKeys.filter(k => k.key !== keyToDelete)
    const docRef = doc(db, 'users', user.uid)
    await updateDoc(docRef, {
      apiKeys: updatedKeys
    })

    setUserData(prev => prev ? {
      ...prev,
      apiKeys: updatedKeys
    } : null)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(text)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const isSubscriptionActive = () => {
    if (!userData) return false
    const endDate = new Date(userData.subscription.endDate)
    return endDate > new Date() && userData.subscription.status !== 'expired'
  }

  const handleUpgradeClick = async () => {
    if (!user) return

    setPaymentLoading(true)
    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.uid })
      })

      const result = await response.json()

      if (result.success && result.redirectUrl) {
        // Redirect to NOWPayments invoice page
        window.open(result.redirectUrl, '_blank')
      } else {
        alert('Failed to create payment. Please try again.')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to create payment. Please try again.')
    } finally {
      setPaymentLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SportsStats API
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-red-600 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subscription Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Status</p>
              <p className={`font-semibold ${isSubscriptionActive() ? 'text-green-600' : 'text-orange-600'}`}>
                {userData?.subscription.status.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Start Date</p>
              <p className="font-semibold text-gray-900">
                {userData && new Date(userData.subscription.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">End Date</p>
              <p className="font-semibold text-gray-900">
                {userData && new Date(userData.subscription.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          {!isSubscriptionActive() && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 mb-2">
                Your subscription has expired or is in trial mode. Upgrade to continue using the API.
              </p>
              <button
                onClick={handleUpgradeClick}
                disabled={paymentLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {paymentLoading ? 'Creating Payment...' : 'Upgrade to Premium ($2,400 USDT/year)'}
              </button>
            </div>
          )}
        </div>

        {/* API Keys */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">API Keys</h2>
            <button
              onClick={() => isSubscriptionActive() && setShowNewKeyModal(true)}
              disabled={!isSubscriptionActive()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate New Key
            </button>
          </div>

          {userData?.apiKeys.length === 0 ? (
            <p className="text-gray-600">No API keys generated yet.</p>
          ) : (
            <div className="space-y-3">
              {userData?.apiKeys.map((apiKey) => (
                <div key={apiKey.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{apiKey.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono text-gray-900">
                          {apiKey.key.substring(0, 20)}...
                        </code>
                        <button
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          {copiedKey === apiKey.key ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteApiKey(apiKey.key)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">API Calls Today</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total API Calls</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-3xl font-bold text-blue-600">0ms</p>
          </div>
        </div>
      </div>

      {/* New Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Generate New API Key</h3>
            <input
              type="text"
              placeholder="Key name (e.g., Production Server)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-gray-900 placeholder-gray-500"
            />
            <div className="flex gap-3">
              <button
                onClick={generateApiKey}
                disabled={!newKeyName}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                Generate
              </button>
              <button
                onClick={() => {
                  setShowNewKeyModal(false)
                  setNewKeyName('')
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}