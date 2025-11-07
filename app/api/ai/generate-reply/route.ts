/**
 * API Route: POST /api/ai/generate-reply
 * Generate AI reply suggestions for a tweet
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateReplySuggestions } from '@/lib/ai-assistant';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { originalTweet, context, numSuggestions } = body;

    if (!originalTweet || !originalTweet.id || !originalTweet.text) {
      return NextResponse.json(
        { error: 'Original tweet is required' },
        { status: 400 }
      );
    }

    const suggestions = await generateReplySuggestions(
      originalTweet,
      context,
      numSuggestions || 2
    );

    return NextResponse.json({
      success: true,
      suggestions,
    });
  } catch (error: any) {
    console.error('Error generating AI reply:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate reply suggestions' },
      { status: 500 }
    );
  }
}
