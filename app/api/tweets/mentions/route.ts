/**
 * API Route: GET /api/tweets/mentions
 * Get mentions of the authenticated user
 */

import { NextResponse, NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  return NextResponse.json(
    {
      success: false,
      mentions: [],
      requiresUpgrade: true,
      message:
        'Mentions require the X API Basic tier or higher. Upgrade your X developer plan to enable real-time mentions.',
      limit,
    },
    { status: 403 }
  );
}
