import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/v1/')) {
    const apiKey = request.headers.get('X-API-Key') || request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'API key is required',
          message: 'Please provide a valid API key in the X-API-Key header or Authorization header'
        },
        { status: 401 }
      )
    }

    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('apiKeys', 'array-contains-any', [{ key: apiKey }]))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return NextResponse.json(
          {
            error: 'Invalid API key',
            message: 'The provided API key is not valid'
          },
          { status: 401 }
        )
      }

      let user = null
      querySnapshot.forEach((doc) => {
        const userData = doc.data()
        const hasKey = userData.apiKeys.some((key: any) => key.key === apiKey)
        if (hasKey) {
          user = { id: doc.id, ...userData }
        }
      })

      if (!user) {
        return NextResponse.json(
          {
            error: 'Invalid API key',
            message: 'The provided API key is not valid'
          },
          { status: 401 }
        )
      }

      const subscription = (user as any).subscription
      const endDate = new Date(subscription.endDate)
      const isActive = endDate > new Date() && subscription.status === 'active'

      if (!isActive) {
        return NextResponse.json(
          {
            error: 'Subscription expired',
            message: 'Your subscription has expired. Please renew to continue using the API',
            subscription_status: subscription.status,
            expiry_date: subscription.endDate
          },
          { status: 403 }
        )
      }

      const response = NextResponse.next()
      response.headers.set('x-user-id', (user as any).id)
      response.headers.set('x-rate-limit', '1000')
      return response

    } catch (error) {
      console.error('Middleware error:', error)
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Unable to verify API key'
        },
        { status: 500 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/v1/:path*']
}