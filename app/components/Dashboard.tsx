'use client';

import { useState } from 'react';
import Overview from './Overview';
import Compose from './Compose';
import Mentions from './Mentions';
import Settings from './Settings';

type Tab = 'overview' | 'compose' | 'mentions' | 'settings';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview' },
    { id: 'compose' as Tab, label: 'Compose' },
    { id: 'mentions' as Tab, label: 'Mentions' },
    { id: 'settings' as Tab, label: 'Settings' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>UINUX: X Social Media Manager</h1>
        <p>Manage and automate your X (Twitter) account</p>
      </header>

      <nav className="dashboard-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="dashboard-main">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'compose' && <Compose />}
        {activeTab === 'mentions' && <Mentions />}
        {activeTab === 'settings' && <Settings />}
      </main>
    </div>
  );
}
