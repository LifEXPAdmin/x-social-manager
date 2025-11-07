'use client';

import { useState, useEffect } from 'react';

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/user/me');
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Account Information</h3>
        {loading && <p>Loading...</p>}
        {user && (
          <div className="user-info">
            <p>
              <strong>Username:</strong> @{user.username}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            {user.profile_image_url && (
              <img
                src={user.profile_image_url}
                alt="Profile"
                className="profile-image"
              />
            )}
          </div>
        )}
      </div>

      <div className="settings-section">
        <h3>API Configuration</h3>
        <p>
          API credentials are configured via environment variables in{' '}
          <code>.env.local</code>
        </p>
        <p className="note">
          Make sure you have set:
          <ul>
            <li>X_API_KEY</li>
            <li>X_API_SECRET</li>
            <li>X_ACCESS_TOKEN</li>
            <li>X_ACCESS_TOKEN_SECRET</li>
            <li>X_BEARER_TOKEN</li>
            <li>OPENAI_API_KEY</li>
          </ul>
        </p>
      </div>

      <div className="settings-section">
        <h3>About</h3>
        <p>
          <strong>UINUX: X Social Media Manager</strong>
        </p>
        <p>Version 0.1.0</p>
        <p>
          A private dashboard for managing your X (Twitter) account with AI-powered
          reply assistance.
        </p>
      </div>
    </div>
  );
}
