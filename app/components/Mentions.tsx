'use client';

import { useEffect, useState } from 'react';
import AIReplyAssistant from './AIReplyAssistant';

interface Mention {
  id: string;
  text: string;
  author_id?: string;
  created_at?: string;
  public_metrics?: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
  };
}

export default function Mentions() {
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTweet, setSelectedTweet] = useState<Mention | null>(null);
  const [requiresUpgrade, setRequiresUpgrade] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState('');

  useEffect(() => {
    fetchMentions();
  }, []);

  const fetchMentions = async () => {
    try {
      setLoading(true);
      setError(null);
      setRequiresUpgrade(false);

      const response = await fetch('/api/tweets/mentions?limit=20');
      const data = await response.json();

      if (response.ok && data.success) {
        setMentions(data.mentions);
      } else if (data.requiresUpgrade) {
        setRequiresUpgrade(true);
        setUpgradeMessage(data.message);
        setMentions([]);
        setSelectedTweet(null);
      } else {
        setError(data.error || 'Failed to fetch mentions');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch mentions');
    } finally {
      setLoading(false);
    }
  };

  const handleReplySuccess = () => {
    // Refresh mentions after successful reply
    fetchMentions();
    setSelectedTweet(null);
  };

  return (
    <div className="mentions">
      <h2>Mentions</h2>
      <button
        onClick={fetchMentions}
        className="refresh-button"
        disabled={loading || requiresUpgrade}
      >
        Refresh
      </button>

      {loading && <p>Loading mentions...</p>}
      {requiresUpgrade && (
        <div className="upgrade-card">
          <p>{upgradeMessage}</p>
          <p className="upgrade-note">
            Until you upgrade, track mentions directly in the X app and log the ones you want to
            reply to here.
          </p>
        </div>
      )}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !requiresUpgrade && !error && mentions.length === 0 && (
        <p>No mentions found yet.</p>
      )}
      {!loading && !requiresUpgrade && !error && mentions.length > 0 && (
        <div className="mentions-list">
          {mentions.map((mention) => (
            <div key={mention.id} className="mention-card">
              <p className="mention-text">{mention.text}</p>
              {mention.created_at && (
                <p className="mention-date">
                  {new Date(mention.created_at).toLocaleString()}
                </p>
              )}
              {mention.public_metrics && (
                <div className="mention-metrics">
                  <span>❤️ {mention.public_metrics.like_count || 0}</span>
                  <span>🔄 {mention.public_metrics.retweet_count || 0}</span>
                  <span>💬 {mention.public_metrics.reply_count || 0}</span>
                </div>
              )}
              <button
                onClick={() => setSelectedTweet(mention)}
                className="ai-reply-button"
              >
                Generate AI Reply
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedTweet && (
        <AIReplyAssistant
          tweet={selectedTweet}
          onReplySuccess={handleReplySuccess}
          onClose={() => setSelectedTweet(null)}
        />
      )}
    </div>
  );
}
