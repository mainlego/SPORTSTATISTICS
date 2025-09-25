import { NextRequest, NextResponse } from 'next/server'

const DETAILED_MATCH_DATA: { [key: string]: any } = {
  'nfl_2024_001': {
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
      score: 31,
      record: { wins: 1, losses: 0 }
    },
    away_team: {
      id: 'mia',
      name: 'Miami Dolphins',
      abbreviation: 'MIA',
      score: 10,
      record: { wins: 0, losses: 1 }
    },
    venue: {
      name: 'Highmark Stadium',
      city: 'Buffalo',
      state: 'NY',
      capacity: 71608,
      surface: 'Artificial Turf'
    },
    weather: {
      temperature: 72,
      humidity: 65,
      wind_speed: 8,
      conditions: 'Clear'
    },
    officials: {
      referee: 'Shawn Hochuli',
      umpire: 'Fred Bryan',
      head_linesman: 'Mark Perlman'
    },
    scoring_summary: [
      {
        quarter: 1,
        team: 'BUF',
        type: 'touchdown',
        description: 'Josh Allen 1 yd run (Tyler Bass kick)',
        score: { home: 7, away: 0 }
      },
      {
        quarter: 2,
        team: 'MIA',
        type: 'field_goal',
        description: 'Jason Sanders 42 yd field goal',
        score: { home: 7, away: 3 }
      },
      {
        quarter: 2,
        team: 'BUF',
        type: 'touchdown',
        description: 'Stefon Diggs 15 yd pass from Josh Allen (Tyler Bass kick)',
        score: { home: 14, away: 3 }
      },
      {
        quarter: 3,
        team: 'BUF',
        type: 'field_goal',
        description: 'Tyler Bass 38 yd field goal',
        score: { home: 17, away: 3 }
      },
      {
        quarter: 3,
        team: 'MIA',
        type: 'touchdown',
        description: 'Tyreek Hill 25 yd pass from Tua Tagovailoa (Jason Sanders kick)',
        score: { home: 17, away: 10 }
      },
      {
        quarter: 4,
        team: 'BUF',
        type: 'touchdown',
        description: 'James Cook 8 yd run (Tyler Bass kick)',
        score: { home: 24, away: 10 }
      },
      {
        quarter: 4,
        team: 'BUF',
        type: 'touchdown',
        description: 'Gabe Davis 12 yd pass from Josh Allen (Tyler Bass kick)',
        score: { home: 31, away: 10 }
      }
    ],
    team_statistics: {
      home: {
        first_downs: 24,
        total_yards: 445,
        passing_yards: 260,
        rushing_yards: 185,
        turnovers: 0,
        penalties: 5,
        penalty_yards: 45,
        time_of_possession: '32:15',
        third_down_conversions: '8/14',
        fourth_down_conversions: '1/2',
        red_zone_efficiency: '3/4'
      },
      away: {
        first_downs: 18,
        total_yards: 309,
        passing_yards: 215,
        rushing_yards: 94,
        turnovers: 2,
        penalties: 7,
        penalty_yards: 63,
        time_of_possession: '27:45',
        third_down_conversions: '4/12',
        fourth_down_conversions: '0/1',
        red_zone_efficiency: '1/3'
      }
    },
    player_statistics: {
      passing: [
        {
          player: 'Josh Allen',
          team: 'BUF',
          completions: 18,
          attempts: 28,
          yards: 260,
          touchdowns: 2,
          interceptions: 0,
          rating: 108.3
        },
        {
          player: 'Tua Tagovailoa',
          team: 'MIA',
          completions: 17,
          attempts: 25,
          yards: 215,
          touchdowns: 1,
          interceptions: 1,
          rating: 84.7
        }
      ],
      rushing: [
        {
          player: 'James Cook',
          team: 'BUF',
          carries: 15,
          yards: 95,
          touchdowns: 1,
          longest: 22
        },
        {
          player: 'Josh Allen',
          team: 'BUF',
          carries: 8,
          yards: 42,
          touchdowns: 1,
          longest: 12
        },
        {
          player: 'Raheem Mostert',
          team: 'MIA',
          carries: 12,
          yards: 52,
          touchdowns: 0,
          longest: 15
        }
      ],
      receiving: [
        {
          player: 'Stefon Diggs',
          team: 'BUF',
          receptions: 6,
          yards: 85,
          touchdowns: 1,
          longest: 25
        },
        {
          player: 'Gabe Davis',
          team: 'BUF',
          receptions: 4,
          yards: 62,
          touchdowns: 1,
          longest: 18
        },
        {
          player: 'Tyreek Hill',
          team: 'MIA',
          receptions: 7,
          yards: 95,
          touchdowns: 1,
          longest: 25
        }
      ]
    }
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { sport: string; matchId: string } }
) {
  try {
    const { sport, matchId } = params

    const matchData = DETAILED_MATCH_DATA[matchId]

    if (!matchData) {
      return NextResponse.json(
        {
          error: 'Match not found',
          message: `Match with ID '${matchId}' not found for sport '${sport}'`
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: matchData,
      meta: {
        endpoint: `/api/v1/sports/${sport}/matches/${matchId}`,
        method: 'GET',
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Match details API error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to fetch match details'
      },
      { status: 500 }
    )
  }
}