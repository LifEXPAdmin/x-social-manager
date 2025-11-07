/**
 * API Route: GET /api/user/me
 * Get authenticated user info
 */

import { NextResponse } from 'next/server';
import { getMe } from '@/lib/x-api';

export async function GET() {
  try {
    const user = await getMe();

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('Error fetching user info:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch user info' },
      { status: 500 }
    );
  }
}
