/**
 * API Route: GET /api/tweets/my-tweets
 * Get user's recent tweets
 */

import { NextResponse } from 'next/server';
import { getMyTweets } from '@/lib/x-api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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
