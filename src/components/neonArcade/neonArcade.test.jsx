import { act, fireEvent, render, screen } from '@testing-library/react';
import NeonArcade, { createDeck } from './neonArcade';

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(.999);
});
afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
});
const tile = number => screen.getByRole('button', { name: new RegExp(`^Tile ${number}:`) });
const start = () => fireEvent.click(screen.getByRole('button', { name: /Start game/ }));

test('deck contains six distinct pairs and twelve unique IDs', () => {
  const deck = createDeck();
  expect(new Set(deck.map(card => card.id)).size).toBe(12);
  const symbols = [...new Set(deck.map(card => card.symbol))];
  expect(symbols).toHaveLength(6);
  symbols.forEach(symbol => expect(deck.filter(card => card.symbol === symbol)).toHaveLength(2));
});

test('cards wait for start and mismatches lock a third selection until hidden', () => {
  render(<NeonArcade />);
  fireEvent.click(tile(1));
  expect(tile(1)).toHaveAttribute('aria-pressed', 'false');
  start();
  fireEvent.click(tile(1));
  fireEvent.click(tile(2));
  fireEvent.click(tile(3));
  expect(tile(3)).toHaveAttribute('aria-pressed', 'false');
  act(() => vi.advanceTimersByTime(950));
  expect(tile(1)).toHaveAttribute('aria-pressed', 'false');
  expect(tile(2)).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(tile(3));
  expect(tile(3)).toHaveAttribute('aria-pressed', 'true');
});

test('six matching pairs finish in six moves and replay clears the board', () => {
  render(<NeonArcade />);
  start();
  for (let i = 1; i <= 6; i++) {
    fireEvent.click(tile(i));
    fireEvent.click(tile(i + 6));
    expect(tile(i)).toHaveAttribute('aria-disabled', 'true');
  }
  expect(screen.getByRole('status')).toHaveTextContent('every pair in 6 moves');
  fireEvent.click(screen.getByRole('button', { name: /Play again/ }));
  expect(tile(1)).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('status')).toHaveTextContent('Find the six matching pairs');
});

test('restart cancels a pending mismatch reset', () => {
  render(<NeonArcade />);
  start();
  fireEvent.click(tile(1));
  fireEvent.click(tile(2));
  fireEvent.click(screen.getByRole('button', { name: /Restart game/ }));
  fireEvent.click(tile(4));
  act(() => vi.advanceTimersByTime(1000));
  expect(tile(4)).toHaveAttribute('aria-pressed', 'true');
});
