/**
 * AI Reply Assistant using OpenAI GPT-4 Turbo
 * Generates contextual, tone-matched replies for tweets
 */

import OpenAI from 'openai';
import { getDb } from './db';

let openaiClient: OpenAI | null = null;

/**
 * Initialize OpenAI client
 */
function initOpenAIClient() {
  if (openaiClient) return openaiClient;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key is missing. Please configure in .env.local');
  }

  openaiClient = new OpenAI({
    apiKey: apiKey,
  });

  return openaiClient;
}

/**
 * Get OpenAI client
 */
function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    return initOpenAIClient();
  }
  return openaiClient;
}

/**
 * System prompt for AI assistant
 * Defines tone, style, and guardrails
 */
const SYSTEM_PROMPT = `You are an AI assistant helping to draft replies to tweets on X (Twitter).

Your style should be:
- Motivational and inspirational
- Entrepreneurial and business-focused
- Faith-based and positive (Christian values)
- Professional but warm
- Concise and impactful

Guidelines:
- Keep replies under 280 characters
- Avoid long em dashes (—) - use regular hyphens (-) or periods instead
- Don't use excessive hashtags (max 2-3 if relevant)
- Be authentic and genuine
- Match the tone of the original tweet when appropriate
- If the tweet is negative, respond with grace and positivity
- Never be preachy or overly religious unless the context calls for it
- Focus on value and encouragement

Always provide helpful, engaging, and on-brand responses.`;

/**
 * Generate AI reply suggestions for a tweet
 * @param originalTweet The tweet to reply to
 * @param context Optional context about the conversation
 * @param numSuggestions Number of reply options to generate (default: 2)
 * @returns Array of suggested replies
 */
export async function generateReplySuggestions(
  originalTweet: {
    id: string;
    text: string;
    author?: string;
  },
  context?: string,
  numSuggestions: number = 2
): Promise<string[]> {
  const client = getOpenAIClient();

  const userPrompt = `Generate ${numSuggestions} reply options for this tweet:

Tweet by @${originalTweet.author || 'user'}: "${originalTweet.text}"

${context ? `Context: ${context}` : ''}

Provide ${numSuggestions} different reply options, each under 280 characters. Format as a numbered list, one per line.`;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content || '';
    
    // Parse the numbered list of suggestions
    const suggestions = content
      .split(/\n+/)
      .map((line) => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter((line) => line.length > 0 && line.length <= 280)
      .slice(0, numSuggestions);

    if (suggestions.length === 0) {
      throw new Error('No valid suggestions generated');
    }

    // Store suggestions in database
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO ai_replies (original_tweet_id, original_content, suggested_reply, status)
      VALUES (?, ?, ?, 'pending')
    `);

    suggestions.forEach((suggestion) => {
      stmt.run(originalTweet.id, originalTweet.text, suggestion);
    });

    return suggestions;
  } catch (error: any) {
    console.error('Error generating AI reply:', error);
    throw new Error(`Failed to generate reply suggestions: ${error.message}`);
  }
}

/**
 * Save AI reply suggestion for later review
 */
export function saveAISuggestion(tweetId: string, originalContent: string, suggestedReply: string) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO ai_replies (original_tweet_id, original_content, suggested_reply, status)
    VALUES (?, ?, ?, 'pending')
  `);
  stmt.run(tweetId, originalContent, suggestedReply);
}

/**
 * Get saved AI suggestions
 */
export function getAISuggestions(status: 'pending' | 'posted' = 'pending') {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT * FROM ai_replies
    WHERE status = ?
    ORDER BY created_at DESC
    LIMIT 50
  `);
  return stmt.all(status) as Array<{
    id: number;
    original_tweet_id: string;
    original_content: string;
    suggested_reply: string;
    status: string;
    posted_at: string | null;
    created_at: string;
  }>;
}
