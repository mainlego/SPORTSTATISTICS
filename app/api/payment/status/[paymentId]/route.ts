import { NextRequest, NextResponse } from 'next/server'
import nowPaymentsService from '@/lib/nowpayments'

export async function GET(
  request: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  try {
    const { paymentId } = params

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      )
    }

    const paymentStatus = await nowPaymentsService.getPaymentStatus(paymentId)

    return NextResponse.json({
      success: true,
      payment: paymentStatus
    })

  } catch (error) {
    console.error('Payment status error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment status' },
      { status: 500 }
    )
  }
}