/**
 * API Route: POST /api/tweets/schedule
 * Schedule a tweet for later
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, scheduledFor } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Tweet content is required' },
        { status: 400 }
      );
    }

    if (!scheduledFor) {
      return NextResponse.json(
        { error: 'Scheduled time is required' },
        { status: 400 }
      );
    }

    if (content.length > 280) {
      return NextResponse.json(
        { error: 'Tweet content exceeds 280 characters' },
        { status: 400 }
      );
    }

    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO scheduled_tweets (content, scheduled_for, status)
      VALUES (?, ?, 'pending')
    `);

    const result = stmt.run(content, scheduledFor);

    return NextResponse.json({
      success: true,
      scheduledTweet: {
        id: result.lastInsertRowid,
        content,
        scheduledFor,
        status: 'pending',
      },
    });
  } catch (error: any) {
    console.error('Error scheduling tweet:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to schedule tweet' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/tweets/schedule
 * Get all scheduled tweets
 */
export async function GET() {
  try {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT * FROM scheduled_tweets
      ORDER BY scheduled_for ASC
    `);
    const scheduled = stmt.all();

    return NextResponse.json({
      success: true,
      scheduledTweets: scheduled,
    });
  } catch (error: any) {
    console.error('Error fetching scheduled tweets:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch scheduled tweets' },
      { status: 500 }
    );
  }
}
