'use client';

import { useEffect, useState } from 'react';

interface RateLimit {
  endpoint: string;
  remaining: number;
  reset_at: string;
  limit_total: number;
}

export default function RateLimitDisplay() {
  const [rateLimits, setRateLimits] = useState<RateLimit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRateLimits();
    // Refresh every 30 seconds
    const interval = setInterval(fetchRateLimits, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchRateLimits = async () => {
    try {
      const response = await fetch('/api/rate-limits');
      const data = await response.json();

      if (data.success && data.rateLimits.stored) {
        setRateLimits(data.rateLimits.stored);
      }
    } catch (error) {
      console.error('Error fetching rate limits:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUsagePercentage = (remaining: number, total: number) => {
    return ((total - remaining) / total) * 100;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'critical';
    if (percentage >= 70) return 'warning';
    return 'good';
  };

  // Filter to show most relevant limits
  const relevantLimits = rateLimits.filter((limit) =>
    ['tweets/create', 'tweets/search/recent', 'users/:id/tweets'].includes(limit.endpoint)
  );

  if (loading) {
    return <div className="rate-limits">Loading rate limits...</div>;
  }

  if (relevantLimits.length === 0) {
    return (
      <div className="rate-limits">
        <p>Rate limit data will appear after your first API calls.</p>
      </div>
    );
  }

  return (
    <div className="rate-limits">
      <h3>API Rate Limits</h3>
      <div className="rate-limits-grid">
        {relevantLimits.map((limit) => {
          const usage = getUsagePercentage(limit.remaining, limit.limit_total);
          const status = getStatusColor(usage);
          const resetDate = new Date(limit.reset_at);
          const resetTime = resetDate.toLocaleString();

          return (
            <div key={limit.endpoint} className={`rate-limit-card ${status}`}>
              <div className="rate-limit-header">
                <span className="endpoint-name">
                  {limit.endpoint === 'tweets/create' && '📝 Posts'}
                  {limit.endpoint === 'tweets/search/recent' && '🔍 Search'}
                  {limit.endpoint === 'users/:id/tweets' && '📊 Timeline'}
                  {!['tweets/create', 'tweets/search/recent', 'users/:id/tweets'].includes(
                    limit.endpoint
                  ) && limit.endpoint}
                </span>
                <span className="usage-text">
                  {limit.remaining} / {limit.limit_total} remaining
                </span>
              </div>
              <div className="usage-bar">
                <div
                  className={`usage-fill ${status}`}
                  style={{ width: `${usage}%` }}
                />
              </div>
              <div className="rate-limit-footer">
                <span className="reset-time">Resets: {resetTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
