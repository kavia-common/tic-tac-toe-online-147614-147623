import React from 'react';

// PUBLIC_INTERFACE
export default function StatusBar({ status, hint }) {
  /** Displays game status messaging with optional hint. */
  return (
    <div className="status card" role="status" aria-live="polite">
      <div className="status-text">{status}</div>
      {hint ? <div className="status-hint">{hint}</div> : null}
    </div>
  );
}
