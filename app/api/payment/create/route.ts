import { NextRequest, NextResponse } from 'next/server'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import nowPaymentsService from '@/lib/nowpayments'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const userDoc = await getDoc(doc(db, 'users', userId))

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const userData = userDoc.data()
    const userEmail = userData.email

    const payment = await nowPaymentsService.createPayment(userId, userEmail)

    return NextResponse.json({
      success: true,
      payment
    })

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}