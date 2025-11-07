/**
 * API Route: GET /api/tweets/my-tweets
 * Get user's recent tweets
 */

import { NextResponse, NextRequest } from 'next/server';
import { getMyTweets } from '@/lib/x-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const tweets = await getMyTweets(limit);

    return NextResponse.json({
      success: true,
      tweets,
    });
  } catch (error: any) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch tweets' },
      { status: 500 }
    );
  }
}
