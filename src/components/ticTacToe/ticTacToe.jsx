import { useMemo, useState } from 'react';
import './ticTacToe.css';

const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function winner(board) {
  const line = wins.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
  if (line) return { mark: board[line[0]], line };
  return board.every(Boolean) ? { mark: 'D', line: [] } : null;
}

function minimax(board, turn) {
  const result = winner(board);
  if (result) return result.mark === 'X' ? 1 : result.mark === 'O' ? -1 : 0;
  const scores = board.map((cell, index) => {
    if (cell) return null;
    const next = [...board]; next[index] = turn;
    return minimax(next, turn === 'X' ? 'O' : 'X');
  }).filter(score => score !== null);
  return turn === 'X' ? Math.max(...scores) : Math.min(...scores);
}

function aiMove(board) {
  const choices = board.map((cell, index) => {
    if (cell) return null;
    const next = [...board]; next[index] = 'X';
    return { index, score: minimax(next, 'O') };
  }).filter(Boolean);
  const best = Math.max(...choices.map(choice => choice.score));
  return choices.find(choice => choice.score === best)?.index;
}

export default function TicTacToe() {
  const empty = useMemo(() => Array(9).fill(null), []);
  const [board, setBoard] = useState(empty);
  const [message, setMessage] = useState('AI is X · You are O');
  const [line, setLine] = useState([]);

  function play(index) {
    if (board[index] || winner(board)) return;
    const humanBoard = [...board]; humanBoard[index] = 'O';
    const humanResult = winner(humanBoard);
    if (humanResult) { setBoard(humanBoard); setLine(humanResult.line); setMessage(humanResult.mark === 'D' ? 'Draw. Reset and run it again.' : 'You beat the AI. Nice move.'); return; }
    const move = aiMove(humanBoard);
    if (move === undefined) { setBoard(humanBoard); setMessage('Draw. Reset and run it again.'); return; }
    const next = [...humanBoard]; next[move] = 'X';
    const result = winner(next);
    setBoard(next); setLine(result?.line || []);
    setMessage(result ? (result.mark === 'X' ? 'The AI found a line.' : 'Draw. Reset and run it again.') : 'Your move, operator.');
  }

  function reset() { setBoard(empty); setLine([]); setMessage('AI is X · You are O'); }

  return <div className="ttt-shell">
    <div className="ttt-board" role="grid" aria-label="Tic-Tac-Toe board">
      {board.map((mark, index) => <button type="button" role="gridcell" key={index} className={`ttt-cell ${mark ? `ttt-${mark.toLowerCase()}` : ''} ${line.includes(index) ? 'ttt-win' : ''}`} onClick={() => play(index)} aria-label={`Cell ${index + 1}${mark ? `, ${mark}` : ', empty'}`} aria-disabled={Boolean(mark || winner(board))}>{mark || '·'}</button>)}
    </div>
    <div className="ttt-footer"><span role="status">{message}</span><button type="button" className="ttt-reset" onClick={reset}>Reset ↻</button></div>
  </div>;
}
