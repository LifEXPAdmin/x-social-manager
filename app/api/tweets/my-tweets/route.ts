/**
 * API Route: GET /api/tweets/my-tweets
 * Get user's recent tweets
 */

import { NextResponse, NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  return NextResponse.json(
    {
      success: false,
      tweets: [],
      requiresUpgrade: true,
      message:
        'Timeline access requires the X API Basic tier or higher. Upgrade your X developer plan to enable this feature.',
      limit,
    },
    { status: 403 }
  );
}
