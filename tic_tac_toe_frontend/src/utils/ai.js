//
// Simple AI for Tic Tac Toe using prioritized heuristic:
// 1. Win if possible
// 2. Block opponent's win
// 3. Take center
// 4. Take a corner
// 5. Take a side
//
// Board is represented as an array of 9 items: 'X' | 'O' | null
//

// PUBLIC_INTERFACE
export function getBestMove(board, aiPlayer) {
  /** This function returns the best move index for the AI using a heuristic approach. */
  const human = aiPlayer === 'X' ? 'O' : 'X';

  // All winning lines
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const emptyIndices = board.reduce((acc, v, i) => {
    if (!v) acc.push(i);
    return acc;
  }, []);

  // 1. Win if possible
  for (const [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    const aiCount = line.filter((v) => v === aiPlayer).length;
    const emptyCount = line.filter((v) => !v).length;
    if (aiCount === 2 && emptyCount === 1) {
      const idx = [a, b, c].find((i) => !board[i]);
      return idx;
    }
  }

  // 2. Block opponent's win
  for (const [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    const humanCount = line.filter((v) => v === human).length;
    const emptyCount = line.filter((v) => !v).length;
    if (humanCount === 2 && emptyCount === 1) {
      const idx = [a, b, c].find((i) => !board[i]);
      return idx;
    }
  }

  // 3. Take center
  if (!board[4]) return 4;

  // 4. Take a corner
  const corners = [0, 2, 6, 8].filter((i) => !board[i]);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

  // 5. Take a side
  const sides = [1, 3, 5, 7].filter((i) => !board[i]);
  if (sides.length) return sides[Math.floor(Math.random() * sides.length)];

  // No moves available
  return null;
}

// PUBLIC_INTERFACE
export function calculateWinner(board) {
  /** Returns 'X' or 'O' if a winner exists, or null otherwise. */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isBoardFull(board) {
  /** Returns true if there are no empty squares on the board. */
  return board.every((c) => c);
}
