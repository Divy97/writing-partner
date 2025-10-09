import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function App() {
  return (
    <div className="popup-container">
      <header>
        <h1>Aura</h1>
        <p className="tagline">Your Intelligent Writing Partner</p>
      </header>
      
      <main>
        <div className="stats-section">
          <h2>Today's Progress</h2>
          <div className="stat-item">
            <span className="stat-label">Corrections</span>
            <span className="stat-value">0</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Words Improved</span>
            <span className="stat-value">0</span>
          </div>
        </div>

        <div className="actions-section">
          <button 
            onClick={() => browser.runtime.openOptionsPage()}
            className="btn-primary"
          >
            Open Dashboard
          </button>
        </div>
      </main>

      <footer>
        <p className="version">v1.0.0</p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

