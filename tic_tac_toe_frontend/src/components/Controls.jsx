import React from 'react';

// PUBLIC_INTERFACE
export default function Controls({ mode, setMode, onReset, xStarts, setXStarts }) {
  /** Controls for selecting mode and resetting the game. */
  return (
    <div className="controls card">
      <div className="controls-row">
        <label htmlFor="mode" className="label">Mode</label>
        <select
          id="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          aria-label="Game mode"
          className="select"
        >
          <option value="pvp">Player vs Player</option>
          <option value="pvc">Player vs Computer</option>
        </select>
      </div>
      <div className="controls-row">
        <label className="label">First Player</label>
        <div className="segmented">
          <button
            className={`segmented-btn ${xStarts ? 'active' : ''}`}
            onClick={() => setXStarts(true)}
            aria-pressed={xStarts}
          >
            X
          </button>
          <button
            className={`segmented-btn ${!xStarts ? 'active' : ''}`}
            onClick={() => setXStarts(false)}
            aria-pressed={!xStarts}
          >
            O
          </button>
        </div>
      </div>
      <div className="controls-row">
        <button className="btn-primary" onClick={onReset} aria-label="Start a new game">
          New Game
        </button>
      </div>
    </div>
  );
}
