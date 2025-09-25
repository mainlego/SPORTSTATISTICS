import { NextRequest, NextResponse } from 'next/server'

const MATCH_DATA = {
  football: [
    {
      id: 'nfl_2024_001',
      date: '2024-09-08T20:00:00Z',
      status: 'completed',
      league: 'NFL',
      season: '2024',
      week: 1,
      home_team: {
        id: 'buf',
        name: 'Buffalo Bills',
        abbreviation: 'BUF',
        score: 31
      },
      away_team: {
        id: 'mia',
        name: 'Miami Dolphins',
        abbreviation: 'MIA',
        score: 10
      },
      venue: {
        name: 'Highmark Stadium',
        city: 'Buffalo',
        state: 'NY'
      },
      statistics: {
        total_yards: { home: 445, away: 309 },
        passing_yards: { home: 260, away: 215 },
        rushing_yards: { home: 185, away: 94 },
        turnovers: { home: 0, away: 2 },
        time_of_possession: { home: '32:15', away: '27:45' }
      }
    },
    {
      id: 'nfl_2024_002',
      date: '2024-09-09T13:00:00Z',
      status: 'live',
      league: 'NFL',
      season: '2024',
      week: 1,
      home_team: {
        id: 'pit',
        name: 'Pittsburgh Steelers',
        abbreviation: 'PIT',
        score: 14
      },
      away_team: {
        id: 'cin',
        name: 'Cincinnati Bengals',
        abbreviation: 'CIN',
        score: 7
      },
      venue: {
        name: 'Heinz Field',
        city: 'Pittsburgh',
        state: 'PA'
      },
      current_quarter: 3,
      time_remaining: '8:45'
    }
  ],
  basketball: [
    {
      id: 'nba_2024_001',
      date: '2024-10-15T19:30:00Z',
      status: 'completed',
      league: 'NBA',
      season: '2024-25',
      home_team: {
        id: 'lal',
        name: 'Los Angeles Lakers',
        abbreviation: 'LAL',
        score: 115
      },
      away_team: {
        id: 'bos',
        name: 'Boston Celtics',
        abbreviation: 'BOS',
        score: 108
      },
      venue: {
        name: 'Crypto.com Arena',
        city: 'Los Angeles',
        state: 'CA'
      },
      statistics: {
        field_goal_percentage: { home: 48.2, away: 44.7 },
        three_point_percentage: { home: 38.5, away: 35.1 },
        free_throw_percentage: { home: 82.4, away: 79.2 },
        rebounds: { home: 45, away: 41 },
        assists: { home: 28, away: 24 },
        turnovers: { home: 12, away: 15 }
      }
    }
  ],
  tennis: [
    {
      id: 'atp_2024_001',
      date: '2024-09-10T14:00:00Z',
      status: 'completed',
      tournament: 'US Open',
      round: 'Final',
      surface: 'Hard',
      player1: {
        id: 'djokovic_n',
        name: 'Novak Djokovic',
        country: 'SRB',
        ranking: 2,
        sets_won: 3
      },
      player2: {
        id: 'medvedev_d',
        name: 'Daniil Medvedev',
        country: 'RUS',
        ranking: 3,
        sets_won: 0
      },
      score: '6-3, 6-2, 6-4',
      duration: '2:15:30',
      venue: {
        name: 'Arthur Ashe Stadium',
        city: 'New York',
        state: 'NY'
      },
      statistics: {
        aces: { player1: 12, player2: 8 },
        double_faults: { player1: 2, player2: 5 },
        first_serve_percentage: { player1: 68, player2: 61 },
        winners: { player1: 35, player2: 22 },
        unforced_errors: { player1: 18, player2: 31 }
      }
    }
  ]
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sport: string }> }
) {
  try {
    const { sport } = await params
    const { searchParams } = new URL(request.url)

    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')
    const league = searchParams.get('league')
    const date = searchParams.get('date')

    if (!MATCH_DATA[sport as keyof typeof MATCH_DATA]) {
      return NextResponse.json(
        {
          error: 'Sport not found',
          message: `Sport '${sport}' is not supported. Available sports: ${Object.keys(MATCH_DATA).join(', ')}`
        },
        { status: 404 }
      )
    }

    let matches: any[] = MATCH_DATA[sport as keyof typeof MATCH_DATA]

    if (status) {
      matches = matches.filter(match => match.status === status)
    }

    if (league && matches.length > 0 && 'league' in matches[0]) {
      matches = matches.filter(match => match.league === league)
    }

    if (date) {
      matches = matches.filter(match => match.date.startsWith(date))
    }

    const paginatedMatches = matches.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: {
        matches: paginatedMatches,
        total: matches.length,
        limit,
        offset,
        sport
      },
      meta: {
        endpoint: `/api/v1/sports/${sport}/matches`,
        method: 'GET',
        timestamp: new Date().toISOString(),
        filters: {
          status,
          league,
          date
        }
      }
    })

  } catch (error) {
    console.error('Matches API error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to fetch match data'
      },
      { status: 500 }
    )
  }
}