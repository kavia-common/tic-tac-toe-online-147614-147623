import React from 'react';

// PUBLIC_INTERFACE
export default function Square({ value, onClick, index, disabled }) {
  /** A single square of the tic tac toe board. */
  const label = `Square ${index + 1}${value ? `, ${value}` : ''}`;

  return (
    <button
      className="ttt-square"
      onClick={onClick}
      aria-label={label}
      role="button"
      disabled={disabled || !!value}
    >
      {value}
    </button>
  );
}
