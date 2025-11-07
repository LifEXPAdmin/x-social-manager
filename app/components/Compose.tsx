'use client';

import { useState } from 'react';

export default function Compose() {
  const [content, setContent] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const characterCount = content.length;
  const maxCharacters = 280;
  const remainingCharacters = maxCharacters - characterCount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isScheduling) {
        if (!scheduledDate || !scheduledTime) {
          setMessage({ type: 'error', text: 'Please select both date and time for scheduling' });
          setLoading(false);
          return;
        }

        const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();
        const response = await fetch('/api/tweets/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, scheduledFor }),
        });

        const data = await response.json();
        if (data.success) {
          setMessage({ type: 'success', text: 'Tweet scheduled successfully!' });
          setContent('');
          setScheduledDate('');
          setScheduledTime('');
        } else {
          setMessage({ type: 'error', text: data.error || 'Failed to schedule tweet' });
        }
      } else {
        const response = await fetch('/api/tweets/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });

        const data = await response.json();
        if (data.success) {
          setMessage({ type: 'success', text: 'Tweet posted successfully!' });
          setContent('');
        } else {
          setMessage({ type: 'error', text: data.error || 'Failed to post tweet' });
        }
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date/time (now)
  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const minTime = now.toTimeString().slice(0, 5);

  return (
    <div className="compose">
      <h2>Compose Tweet</h2>
      <p className="compose-note">
        Free tier tip: you can publish <strong>up to 100 tweets per month</strong> (and 500 total
        writes). Use the scheduler to plan ahead, but always click “Post” yourself so your account
        stays compliant.
      </p>

      <form onSubmit={handleSubmit} className="compose-form">
        <div className="textarea-container">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            maxLength={maxCharacters}
            rows={6}
            className="tweet-textarea"
          />
          <div className={`character-count ${remainingCharacters < 20 ? 'warning' : ''}`}>
            {remainingCharacters} characters remaining
          </div>
        </div>

        <div className="compose-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isScheduling}
              onChange={(e) => setIsScheduling(e.target.checked)}
            />
            Schedule for later
          </label>

          {isScheduling && (
            <div className="schedule-inputs">
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={minDate}
                required={isScheduling}
              />
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                min={scheduledDate === minDate ? minTime : undefined}
                required={isScheduling}
              />
            </div>
          )}
        </div>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !content.trim() || characterCount > maxCharacters}
          className="submit-button"
        >
          {loading ? 'Posting...' : isScheduling ? 'Schedule Tweet' : 'Post Tweet'}
        </button>
      </form>
    </div>
  );
}
