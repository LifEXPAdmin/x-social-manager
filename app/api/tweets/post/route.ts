/**
 * API Route: POST /api/tweets/post
 * Post a tweet immediately
 */

import { NextRequest, NextResponse } from 'next/server';
import { postTweet } from '@/lib/x-api';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Tweet content is required' },
        { status: 400 }
      );
    }

    if (content.length > 280) {
      return NextResponse.json(
        { error: 'Tweet content exceeds 280 characters' },
        { status: 400 }
      );
    }

    // Post the tweet
    const tweet = await postTweet(content);

    return NextResponse.json({
      success: true,
      tweet: {
        id: tweet.id,
        text: tweet.text,
      },
    });
  } catch (error: any) {
    console.error('Error posting tweet:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to post tweet' },
      { status: 500 }
    );
  }
}
