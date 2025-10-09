import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Aura Dashboard</h1>
        <p>Your Writing Improvement Journey</p>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome to Aura! 👋</h2>
          <p>
            Your intelligent writing partner is ready to help you improve your English writing
            skills. Start writing on any webpage, and Aura will provide real-time corrections
            and explanations.
          </p>
        </section>

        <section className="stats-overview">
          <h2>Your Progress</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>0</h3>
              <p>Total Corrections</p>
            </div>
            <div className="stat-card">
              <h3>0</h3>
              <p>Lessons Learned</p>
            </div>
            <div className="stat-card">
              <h3>0</h3>
              <p>Words Improved</p>
            </div>
            <div className="stat-card">
              <h3>0%</h3>
              <p>Accuracy Rate</p>
            </div>
          </div>
        </section>

        <section className="getting-started">
          <h2>Getting Started</h2>
          <ol>
            <li>Navigate to any webpage with text input (Gmail, Slack, Twitter, etc.)</li>
            <li>Start typing in any text field</li>
            <li>Aura will underline errors and suggest corrections</li>
            <li>Click "Explain" to learn why something was corrected</li>
            <li>Review your weekly digest to track improvement areas</li>
          </ol>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);

