import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import './App.css';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import StatusBar from './components/StatusBar';
import { calculateWinner, getBestMove, isBoardFull } from './utils/ai';

// PUBLIC_INTERFACE
function App() {
  /** Main Tic Tac Toe App with Ocean Professional styling and PvP/PvC modes. */

  // Theme state: light only scheme aligned to Ocean Professional palette via CSS vars.
  const [theme] = useState('light');

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('pvp'); // 'pvp' | 'pvc'
  const [xStarts, setXStarts] = useState(true); // who starts X or O

  // Apply theme data attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Reset handler
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(xStarts);
  };

  // Winner and draw state
  const winner = useMemo(() => calculateWinner(board), [board]);
  const draw = useMemo(() => !winner && isBoardFull(board), [board, winner]);

  // Current player symbol
  const currentPlayer = xIsNext ? 'X' : 'O';

  // Handle human clicks
  const handleSquareClick = (index) => {
    if (winner || board[index] || draw) return;
    // If PvC and it's computer's turn, ignore clicks
    if (mode === 'pvc') {
      const aiSymbol = xStarts ? 'O' : 'X';
      if (currentPlayer === aiSymbol) return;
    }
    const next = board.slice();
    next[index] = currentPlayer;
    setBoard(next);
    setXIsNext((prev) => !prev);
  };

  // AI move when needed
  useEffect(() => {
    if (mode !== 'pvc') return;
    if (winner || draw) return;

    const aiSymbol = xStarts ? 'O' : 'X';
    if (currentPlayer !== aiSymbol) return;

    // Delay slightly for UX
    const t = setTimeout(() => {
      const move = getBestMove(board, aiSymbol);
      if (move !== null && board[move] === null) {
        const next = board.slice();
        next[move] = aiSymbol;
        setBoard(next);
        setXIsNext((prev) => !prev);
      }
    }, 350);

    return () => clearTimeout(t);
  }, [board, mode, currentPlayer, xStarts, winner, draw]);

  // Status text
  let statusText = '';
  if (winner) {
    statusText = `Winner: ${winner}`;
  } else if (draw) {
    statusText = 'Draw! Well played.';
  } else {
    statusText = `Turn: ${currentPlayer}`;
  }

  const statusHint =
    mode === 'pvc'
      ? `Mode: Player vs Computer (${xStarts ? 'You are X' : 'You are O'})`
      : 'Mode: Player vs Player';

  return (
    <div className="app-shell">
      <div className="header">
        <h1 className="title">Tic Tac Toe</h1>
        <p className="subtitle">Ocean Professional Edition</p>
      </div>

      <div className="content">
        <Controls
          mode={mode}
          setMode={(m) => {
            setMode(m);
            // Reset when switching modes to maintain clarity
            handleReset();
          }}
          onReset={handleReset}
          xStarts={xStarts}
          setXStarts={(v) => {
            setXStarts(v);
            // Also reset board and current player
            setBoard(Array(9).fill(null));
            setXIsNext(v);
          }}
        />

        <div className="board-wrap card">
          <GameBoard
            board={board}
            onSquareClick={handleSquareClick}
            disabled={!!winner || draw}
          />
        </div>

        <StatusBar status={statusText} hint={statusHint} />
      </div>

      <footer className="footer">
        <span>Built with React</span>
      </footer>
    </div>
  );
}

export default App;
