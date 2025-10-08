import React from 'react';
import Square from './Square';

// PUBLIC_INTERFACE
export default function GameBoard({ board, onSquareClick, disabled }) {
  /** Renders a 3x3 board of Square components. */
  return (
    <div className="board">
      {board.map((val, idx) => (
        <Square
          key={idx}
          index={idx}
          value={val}
          onClick={() => onSquareClick(idx)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
