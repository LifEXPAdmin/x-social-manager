/**
 * API Route: GET /api/rate-limits
 * Get current rate limit status
 */

import { NextResponse } from 'next/server';
import { getRateLimitStatus } from '@/lib/x-api';

export async function GET() {
  try {
    const status = await getRateLimitStatus();

    return NextResponse.json({
      success: true,
      rateLimits: status,
    });
  } catch (error: any) {
    console.error('Error fetching rate limits:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch rate limits' },
      { status: 500 }
    );
  }
}
