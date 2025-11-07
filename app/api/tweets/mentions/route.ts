/**
 * API Route: GET /api/tweets/mentions
 * Get mentions of the authenticated user
 */

import { NextResponse } from 'next/server';
import { getMentions } from '@/lib/x-api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const mentions = await getMentions(limit);

    return NextResponse.json({
      success: true,
      mentions,
    });
  } catch (error: any) {
    console.error('Error fetching mentions:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch mentions' },
      { status: 500 }
    );
  }
}
