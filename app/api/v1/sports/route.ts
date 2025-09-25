import { NextRequest, NextResponse } from 'next/server'

const SPORTS_DATA = [
  {
    id: 'football',
    name: 'Football',
    description: 'American Football statistics including NFL, college, and international leagues',
    leagues: ['NFL', 'NCAA', 'CFL'],
    endpoints: [
      'GET /api/v1/sports/football/matches',
      'GET /api/v1/sports/football/teams',
      'GET /api/v1/sports/football/players'
    ]
  },
  {
    id: 'basketball',
    name: 'Basketball',
    description: 'Basketball statistics including NBA, WNBA, and international leagues',
    leagues: ['NBA', 'WNBA', 'EuroLeague'],
    endpoints: [
      'GET /api/v1/sports/basketball/matches',
      'GET /api/v1/sports/basketball/teams',
      'GET /api/v1/sports/basketball/players'
    ]
  },
  {
    id: 'tennis',
    name: 'Tennis',
    description: 'Professional tennis statistics including ATP and WTA tours',
    leagues: ['ATP', 'WTA', 'ITF'],
    endpoints: [
      'GET /api/v1/sports/tennis/matches',
      'GET /api/v1/sports/tennis/tournaments',
      'GET /api/v1/sports/tennis/players'
    ]
  },
  {
    id: 'baseball',
    name: 'Baseball',
    description: 'Baseball statistics including MLB and minor leagues',
    leagues: ['MLB', 'AAA', 'AA'],
    endpoints: [
      'GET /api/v1/sports/baseball/matches',
      'GET /api/v1/sports/baseball/teams',
      'GET /api/v1/sports/baseball/players'
    ]
  },
  {
    id: 'hockey',
    name: 'Hockey',
    description: 'Ice hockey statistics including NHL and international leagues',
    leagues: ['NHL', 'KHL', 'AHL'],
    endpoints: [
      'GET /api/v1/sports/hockey/matches',
      'GET /api/v1/sports/hockey/teams',
      'GET /api/v1/sports/hockey/players'
    ]
  },
  {
    id: 'cricket',
    name: 'Cricket',
    description: 'Cricket statistics including international and domestic leagues',
    leagues: ['ICC', 'IPL', 'BBL'],
    endpoints: [
      'GET /api/v1/sports/cricket/matches',
      'GET /api/v1/sports/cricket/teams',
      'GET /api/v1/sports/cricket/players'
    ]
  },
  {
    id: 'rugby',
    name: 'Rugby',
    description: 'Rugby statistics including union and league formats',
    leagues: ['World Rugby', 'NRL', 'Super Rugby'],
    endpoints: [
      'GET /api/v1/sports/rugby/matches',
      'GET /api/v1/sports/rugby/teams',
      'GET /api/v1/sports/rugby/players'
    ]
  },
  {
    id: 'golf',
    name: 'Golf',
    description: 'Professional golf statistics and tournament data',
    leagues: ['PGA Tour', 'European Tour', 'LPGA'],
    endpoints: [
      'GET /api/v1/sports/golf/tournaments',
      'GET /api/v1/sports/golf/players',
      'GET /api/v1/sports/golf/leaderboards'
    ]
  },
  {
    id: 'boxing',
    name: 'Boxing',
    description: 'Professional boxing statistics and fight records',
    leagues: ['WBC', 'WBA', 'IBF', 'WBO'],
    endpoints: [
      'GET /api/v1/sports/boxing/fights',
      'GET /api/v1/sports/boxing/fighters',
      'GET /api/v1/sports/boxing/rankings'
    ]
  },
  {
    id: 'mma',
    name: 'MMA',
    description: 'Mixed martial arts statistics and fight records',
    leagues: ['UFC', 'Bellator', 'ONE FC'],
    endpoints: [
      'GET /api/v1/sports/mma/fights',
      'GET /api/v1/sports/mma/fighters',
      'GET /api/v1/sports/mma/rankings'
    ]
  }
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: {
        sports: SPORTS_DATA,
        total_sports: SPORTS_DATA.length
      },
      meta: {
        endpoint: '/api/v1/sports',
        method: 'GET',
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Sports API error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to fetch sports data'
      },
      { status: 500 }
    )
  }
}