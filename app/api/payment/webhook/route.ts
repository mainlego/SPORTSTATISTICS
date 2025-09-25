import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import nowPaymentsService from '@/lib/nowpayments'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-nowpayments-sig')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      )
    }

    const isValid = nowPaymentsService.verifyWebhookSignature(body, signature)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    if (body.payment_status === 'finished') {
      const orderId = body.order_id
      const userId = orderId.split('_')[1]

      if (userId) {
        const userDocRef = doc(db, 'users', userId)
        const endDate = new Date()
        endDate.setFullYear(endDate.getFullYear() + 1)

        await updateDoc(userDocRef, {
          'subscription.status': 'active',
          'subscription.startDate': new Date().toISOString(),
          'subscription.endDate': endDate.toISOString(),
          'subscription.paymentId': body.payment_id,
          'subscription.lastPaymentDate': new Date().toISOString()
        })

        console.log(`Subscription activated for user: ${userId}`)
      }
    }

    if (body.payment_status === 'failed' || body.payment_status === 'expired') {
      const orderId = body.order_id
      const userId = orderId.split('_')[1]

      if (userId) {
        const userDocRef = doc(db, 'users', userId)

        await updateDoc(userDocRef, {
          'subscription.lastPaymentAttempt': new Date().toISOString(),
          'subscription.lastPaymentStatus': body.payment_status
        })

        console.log(`Payment ${body.payment_status} for user: ${userId}`)
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}