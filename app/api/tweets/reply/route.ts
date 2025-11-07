/**
 * API Route: POST /api/tweets/reply
 * Reply to a tweet
 */

import { NextRequest, NextResponse } from 'next/server';
import { replyToTweet } from '@/lib/x-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tweetId, content } = body;

    if (!tweetId || typeof tweetId !== 'string') {
      return NextResponse.json(
        { error: 'Tweet ID is required' },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Reply content is required' },
        { status: 400 }
      );
    }

    if (content.length > 280) {
      return NextResponse.json(
        { error: 'Reply content exceeds 280 characters' },
        { status: 400 }
      );
    }

    const reply = await replyToTweet(tweetId, content);

    return NextResponse.json({
      success: true,
      reply: {
        id: reply.id,
        text: reply.text,
      },
    });
  } catch (error: any) {
    console.error('Error replying to tweet:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to reply to tweet' },
      { status: 500 }
    );
  }
}
