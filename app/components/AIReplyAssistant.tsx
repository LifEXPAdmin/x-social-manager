'use client';

import { useState } from 'react';

interface Tweet {
  id: string;
  text: string;
  author_id?: string;
}

interface AIReplyAssistantProps {
  tweet: Tweet;
  onReplySuccess: () => void;
  onClose: () => void;
}

export default function AIReplyAssistant({
  tweet,
  onReplySuccess,
  onClose,
}: AIReplyAssistantProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedReply, setSelectedReply] = useState<string>('');
  const [editableReply, setEditableReply] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleGenerateSuggestions = async () => {
    setGenerating(true);
    setMessage(null);

    try {
      const response = await fetch('/api/ai/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalTweet: tweet,
          numSuggestions: 2,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuggestions(data.suggestions);
        if (data.suggestions.length > 0) {
          setSelectedReply(data.suggestions[0]);
          setEditableReply(data.suggestions[0]);
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to generate suggestions' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setGenerating(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSelectedReply(suggestion);
    setEditableReply(suggestion);
  };

  const handlePostReply = async () => {
    if (!editableReply.trim()) {
      setMessage({ type: 'error', text: 'Please enter a reply' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/tweets/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tweetId: tweet.id,
          content: editableReply,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Reply posted successfully!' });
        setTimeout(() => {
          onReplySuccess();
        }, 1000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to post reply' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const characterCount = editableReply.length;
  const maxCharacters = 280;

  return (
    <div className="ai-reply-assistant-overlay">
      <div className="ai-reply-assistant-modal">
        <div className="modal-header">
          <h3>AI Reply Assistant</h3>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>

        <div className="original-tweet">
          <p className="original-label">Original Tweet:</p>
          <p className="original-text">{tweet.text}</p>
        </div>

        {suggestions.length === 0 && !generating && (
          <button onClick={handleGenerateSuggestions} className="generate-button">
            Generate Reply Suggestions
          </button>
        )}

        {generating && <p>Generating AI suggestions...</p>}

        {suggestions.length > 0 && (
          <div className="suggestions-section">
            <h4>AI Suggestions (select one):</h4>
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={`suggestion-button ${
                    selectedReply === suggestion ? 'selected' : ''
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="reply-editor">
          <h4>Edit & Post Reply:</h4>
          <textarea
            value={editableReply}
            onChange={(e) => setEditableReply(e.target.value)}
            placeholder="Edit the selected reply or write your own..."
            maxLength={maxCharacters}
            rows={4}
            className="reply-textarea"
          />
          <div className="character-count">
            {characterCount} / {maxCharacters} characters
          </div>
        </div>

        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button
            onClick={handlePostReply}
            disabled={loading || !editableReply.trim() || characterCount > maxCharacters}
            className="post-button"
          >
            {loading ? 'Posting...' : 'Post Reply'}
          </button>
        </div>
      </div>
    </div>
  );
}
