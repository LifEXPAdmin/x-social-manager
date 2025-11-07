/**
 * X (Twitter) API v2 Integration
 * Handles authentication, posting tweets, reading feeds, and rate limit tracking
 */

import { TwitterApi, TweetV2, UserV2 } from 'twitter-api-v2';
import { getDb } from './db';

// Initialize X API client
let xClient: TwitterApi | null = null;

/**
 * Initialize X API client with credentials
 */
export function initXClient() {
  if (xClient) return xClient;

  const apiKey = process.env.X_API_KEY;
  const apiSecret = process.env.X_API_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET;
  const bearerToken = process.env.X_BEARER_TOKEN;

  if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
    throw new Error('X API credentials are missing. Please configure in .env.local');
  }

  // Create read-write client with OAuth 1.0a
  xClient = new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken: accessToken,
    accessSecret: accessTokenSecret,
  });

  return xClient;
}

/**
 * Get authenticated X API client
 */
export function getXClient(): TwitterApi {
  if (!xClient) {
    return initXClient();
  }
  return xClient;
}

/**
 * Update rate limit tracking in database
 */
function updateRateLimit(endpoint: string, remaining: number, resetAt: Date, limitTotal: number) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO rate_limits (endpoint, remaining, reset_at, limit_total, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'))
    ON CONFLICT(endpoint) DO UPDATE SET
      remaining = excluded.remaining,
      reset_at = excluded.reset_at,
      limit_total = excluded.limit_total,
      updated_at = datetime('now')
  `);
  stmt.run(endpoint, remaining, resetAt.toISOString(), limitTotal);
}

/**
 * Extract rate limit metadata from twitter-api-v2 responses.
 * The library does not expose this in its TypeScript types, so we
 * safely access and narrow it here.
 */
function extractRateLimit(response: unknown) {
  const candidate = response as { rateLimit?: { remaining: number; reset: number; limit: number } };
  return candidate?.rateLimit ?? null;
}

/**
 * Post a tweet
 * @param content Tweet content (max 280 characters)
 * @returns Posted tweet data
 */
export type PostedTweet = Pick<TweetV2, 'id' | 'text'>;

export async function postTweet(content: string): Promise<PostedTweet> {
  if (content.length > 280) {
    throw new Error('Tweet content exceeds 280 characters');
  }

  const client = getXClient();
  const rwClient = client.readWrite;

  try {
    const tweet = await rwClient.v2.tweet({ text: content });

    // Update rate limits (X API v2 posting endpoint)
    // Free tier: 100 posts/month, resets monthly
    const rateLimit = extractRateLimit(tweet);
    if (rateLimit) {
      updateRateLimit(
        'tweets/create',
        rateLimit.remaining,
        new Date(rateLimit.reset * 1000),
        rateLimit.limit
      );
    }

    // Cache the posted tweet
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO posted_tweets (tweet_id, content, posted_at)
      VALUES (?, ?, datetime('now'))
      ON CONFLICT(tweet_id) DO UPDATE SET
        content = excluded.content
    `);
    stmt.run(tweet.data.id, content);

    return {
      id: tweet.data.id,
      text: tweet.data.text,
    };
  } catch (error: any) {
    console.error('Error posting tweet:', error);
    throw new Error(`Failed to post tweet: ${error.message}`);
  }
}

/**
 * Get user's recent tweets
 * @param limit Number of tweets to retrieve (max 100)
 * @returns Array of tweets
 */
export async function getMyTweets(limit: number = 10): Promise<TweetV2[]> {
  const client = getXClient();
  const rwClient = client.readWrite;

  try {
    // Get authenticated user's ID first
    const me = await rwClient.v2.me();
    const userId = me.data.id;

    // Get user's tweets
    const tweetsResponse = await rwClient.v2.userTimeline(userId, {
      max_results: Math.min(limit, 100),
      'tweet.fields': ['created_at', 'public_metrics', 'author_id'],
    });

    // Update rate limits
    const rateLimit = extractRateLimit(tweetsResponse);
    if (rateLimit) {
      updateRateLimit(
        'users/:id/tweets',
        rateLimit.remaining,
        new Date(rateLimit.reset * 1000),
        rateLimit.limit
      );
    }

    return tweetsResponse.data.data || [];
  } catch (error: any) {
    console.error('Error fetching tweets:', error);
    throw new Error(`Failed to fetch tweets: ${error.message}`);
  }
}

/**
 * Get mentions of the authenticated user
 * @param limit Number of mentions to retrieve (max 100)
 * @returns Array of tweets mentioning the user
 */
export async function getMentions(limit: number = 20): Promise<TweetV2[]> {
  const client = getXClient();
  const rwClient = client.readWrite;

  try {
    // Get authenticated user's username
    const me = await rwClient.v2.me({ 'user.fields': ['username'] });
    const username = me.data.username;

    // Get mentions
    const mentionsResponse = await rwClient.v2.search(`@${username}`, {
      max_results: Math.min(limit, 100),
      'tweet.fields': ['created_at', 'public_metrics', 'author_id', 'in_reply_to_user_id'],
    });

    // Update rate limits
    const rateLimit = extractRateLimit(mentionsResponse);
    if (rateLimit) {
      updateRateLimit(
        'tweets/search/recent',
        rateLimit.remaining,
        new Date(rateLimit.reset * 1000),
        rateLimit.limit
      );
    }

    return mentionsResponse.data.data || [];
  } catch (error: any) {
    console.error('Error fetching mentions:', error);
    throw new Error(`Failed to fetch mentions: ${error.message}`);
  }
}

/**
 * Reply to a tweet
 * @param tweetId ID of the tweet to reply to
 * @param content Reply content (max 280 characters)
 * @returns Posted reply tweet data
 */
export async function replyToTweet(tweetId: string, content: string): Promise<PostedTweet> {
  if (content.length > 280) {
    throw new Error('Reply content exceeds 280 characters');
  }

  const client = getXClient();
  const rwClient = client.readWrite;

  try {
    const reply = await rwClient.v2.tweet({
      text: content,
      reply: {
        in_reply_to_tweet_id: tweetId,
      },
    });

    // Update rate limits
    const rateLimit = extractRateLimit(reply);
    if (rateLimit) {
      updateRateLimit(
        'tweets/create',
        rateLimit.remaining,
        new Date(rateLimit.reset * 1000),
        rateLimit.limit
      );
    }

    return {
      id: reply.data.id,
      text: reply.data.text,
    };
  } catch (error: any) {
    console.error('Error replying to tweet:', error);
    throw new Error(`Failed to reply to tweet: ${error.message}`);
  }
}

/**
 * Get current rate limit status
 * @returns Rate limit information for key endpoints
 */
export async function getRateLimitStatus() {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM rate_limits');
  const limits = stmt.all() as Array<{
    endpoint: string;
    remaining: number;
    reset_at: string;
    limit_total: number;
    updated_at: string;
  }>;

  // Also fetch live rate limits from X API
  try {
    const client = getXClient();
    // rate limit lookups only need read-only access
    const roClient = client.readOnly as any;
    const maybeRateLimitStatus = roClient?.v2?.rateLimitStatus;

    if (typeof maybeRateLimitStatus === 'function') {
      const rateLimits = await maybeRateLimitStatus.call(roClient.v2, ['tweets', 'users']);
      return {
        stored: limits,
        live: rateLimits,
      };
    }
  } catch (error) {
    console.error('Error fetching live rate limits:', error);
  }

  return {
    stored: limits,
    live: null,
  };
}

/**
 * Get authenticated user info
 */
export async function getMe(): Promise<UserV2> {
  const client = getXClient();
  const rwClient = client.readWrite;
  const me = await rwClient.v2.me({ 'user.fields': ['username', 'name', 'profile_image_url'] });
  return me.data;
}
