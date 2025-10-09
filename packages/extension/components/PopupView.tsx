import React from 'react';

interface PopupViewProps {
  stats: {
    corrections: number;
    wordsImproved: number;
    lessonsLearned: number;
  };
  onOpenDashboard: () => void;
}

export function PopupView({ stats, onOpenDashboard }: PopupViewProps) {
  return (
    <div className="popup-view">
      <h2>Today's Progress</h2>
      
      <div className="stats-list">
        <div className="stat-item">
          <span className="stat-label">Corrections</span>
          <span className="stat-value">{stats.corrections}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Words Improved</span>
          <span className="stat-value">{stats.wordsImproved}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Lessons Learned</span>
          <span className="stat-value">{stats.lessonsLearned}</span>
        </div>
      </div>

      <button onClick={onOpenDashboard} className="btn-dashboard">
        Open Full Dashboard
      </button>
    </div>
  );
}

