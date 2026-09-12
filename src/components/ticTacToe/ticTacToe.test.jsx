import { fireEvent, render, screen } from '@testing-library/react';
import TicTacToe, { aiMove, winner } from './ticTacToe';

test('AI takes a win, blocks a loss, and never mutates its input', () => {
  const board = ['O', 'O', null, 'X', null, null, null, null, null];
  expect(aiMove(board)).toBe(2);
  expect(board[2]).toBeNull();
  expect(aiMove(['X', 'X', null, 'O', 'O', null, null, null, null])).toBe(2);
});

test('all possible human move sequences end in an AI win or a draw', () => {
  function explore(board) {
    const result = winner(board);
    if (result) { expect(result.mark).not.toBe('O'); return; }
    board.forEach((cell, index) => {
      if (cell) return;
      const next = [...board];
      next[index] = 'O';
      if (!winner(next)) next[aiMove(next)] = 'X';
      explore(next);
    });
  }
  explore(Array(9).fill(null));
});

test('reset clears the board after a human and AI move', () => {
  render(<TicTacToe />);
  fireEvent.click(screen.getByRole('gridcell', { name: 'Cell 1, empty' }));
  expect(screen.getByRole('gridcell', { name: 'Cell 1, O' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Reset/ }));
  expect(screen.getAllByRole('gridcell', { name: /empty/ })).toHaveLength(9);
});
