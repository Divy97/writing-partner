import React, { useState } from 'react';

interface CorrectionTooltipProps {
  originalText: string;
  correctedText: string;
  errorType: string;
  onAccept: () => void;
  onReject: () => void;
  onExplain?: () => void;
}

export function CorrectionTooltip({
  originalText,
  correctedText,
  errorType,
  onAccept,
  onReject,
  onExplain,
}: CorrectionTooltipProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="correction-tooltip">
      <div className="correction-header">
        <span className="error-type">{errorType}</span>
      </div>
      
      <div className="correction-content">
        <div className="text-comparison">
          <span className="original-text">{originalText}</span>
          <span className="arrow">→</span>
          <span className="corrected-text">{correctedText}</span>
        </div>
      </div>

      <div className="correction-actions">
        <button onClick={onAccept} className="btn-accept">
          Accept
        </button>
        <button onClick={onReject} className="btn-reject">
          Ignore
        </button>
        {onExplain && (
          <button
            onClick={() => {
              setShowExplanation(true);
              onExplain();
            }}
            className="btn-explain"
          >
            Why?
          </button>
        )}
      </div>

      {showExplanation && (
        <div className="explanation-section">
          <p className="explanation-text">Loading explanation...</p>
        </div>
      )}
    </div>
  );
}

