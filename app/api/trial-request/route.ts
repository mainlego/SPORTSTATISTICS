import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for demo purposes
// In production, use a database
const trialRequests = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if already requested (prevent spam)
    if (trialRequests.has(email)) {
      return NextResponse.json(
        { error: 'Trial already requested for this email' },
        { status: 429 }
      )
    }

    // Add to requests (expires after 24 hours in real implementation)
    trialRequests.add(email)

    // Generate trial link
    const trialLink = `${process.env.NEXT_PUBLIC_API_URL}/register?trial=true&email=${encodeURIComponent(email)}`

    // In production, send actual email here
    console.log(`Trial requested for: ${email}`)
    console.log(`Trial link: ${trialLink}`)

    // TODO: Implement actual email sending
    // await sendEmail({
    //   to: email,
    //   subject: 'Your SportsStats API 7-Day Trial',
    //   html: `
    //     <h2>Welcome to SportsStats API!</h2>
    //     <p>Click the link below to start your 7-day free trial:</p>
    //     <a href="${trialLink}">Start Free Trial</a>
    //     <p>This link expires in 24 hours.</p>
    //   `
    // })

    return NextResponse.json({
      success: true,
      message: 'Trial link sent to your email',
      // For development, include the link in response
      ...(process.env.NODE_ENV === 'development' && { trialLink })
    })

  } catch (error) {
    console.error('Trial request error:', error)
    return NextResponse.json(
      { error: 'Failed to process trial request' },
      { status: 500 }
    )
  }
}