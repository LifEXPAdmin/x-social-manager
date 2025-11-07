'use client';

import { useEffect, useState } from 'react';
import RateLimitDisplay from './RateLimitDisplay';

interface Tweet {
  id: string;
  text: string;
  created_at?: string;
  public_metrics?: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
  };
}

export default function Overview() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentTweets();
  }, []);

  const fetchRecentTweets = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tweets/my-tweets?limit=5');
      const data = await response.json();

      if (data.success) {
        setTweets(data.tweets);
      } else {
        setError(data.error || 'Failed to fetch tweets');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tweets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overview">
      <h2>Overview</h2>

      <RateLimitDisplay />

      <div className="recent-tweets-section">
        <h3>Recent Tweets</h3>
        {loading && <p>Loading tweets...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && tweets.length === 0 && (
          <p>No tweets found. Start composing your first tweet!</p>
        )}
        {!loading && !error && tweets.length > 0 && (
          <div className="tweets-list">
            {tweets.map((tweet) => (
              <div key={tweet.id} className="tweet-card">
                <p className="tweet-text">{tweet.text}</p>
                {tweet.public_metrics && (
                  <div className="tweet-metrics">
                    <span>❤️ {tweet.public_metrics.like_count || 0}</span>
                    <span>🔄 {tweet.public_metrics.retweet_count || 0}</span>
                    <span>💬 {tweet.public_metrics.reply_count || 0}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
