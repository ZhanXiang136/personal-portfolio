import { render } from '@testing-library/react';
import StockTradingAI from './StockTradingAI';

test('external app cannot navigate the parent or open popups', () => {
  const { container } = render(<StockTradingAI />);
  const frame = container.querySelector('iframe');
  expect(frame).toHaveAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
  expect(frame).toHaveAttribute('referrerpolicy', 'no-referrer');
  expect(frame).toHaveAttribute('src', 'https://stocktradingai.netlify.app');
});
