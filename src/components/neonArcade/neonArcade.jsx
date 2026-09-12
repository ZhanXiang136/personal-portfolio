import { useEffect, useRef, useState } from 'react';
import './neonArcade.css';

const symbols = ['<>', '{}', '//', '=>', '[]', '&&'];

export function createDeck() {
  const cards = [...symbols, ...symbols].map((symbol, id) => ({ symbol, id }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function NeonArcade() {
  const [cards, setCards] = useState(createDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);
  const [message, setMessage] = useState('Ready when you are.');
  const resetTimer = useRef(null);
  const locked = useRef(false);
  const complete = matched.length === cards.length;

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  function start() {
    clearTimeout(resetTimer.current);
    locked.current = false;
    setCards(createDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setStarted(true);
    setMessage('Find the six matching pairs.');
  }

  function reveal(card) {
    if (!started || locked.current || flipped.includes(card.id) || matched.includes(card.id)) return;
    const next = [...flipped, card.id];
    setFlipped(next);
    if (next.length !== 2) return;
    setMoves(value => value + 1);
    const first = cards.find(item => item.id === next[0]);
    if (first.symbol === card.symbol) {
      const found = [...matched, ...next];
      setMatched(found);
      setFlipped([]);
      setMessage(found.length === cards.length ? `All systems synced! You found every pair in ${moves + 1} moves.` : `Pair found. ${found.length / 2} of 6 synced.`);
    } else {
      locked.current = true;
      setMessage('Different signals. Try another pair.');
      resetTimer.current = setTimeout(() => {
        setFlipped([]);
        locked.current = false;
      }, 950);
    }
  }

  return <div className="arcade">
    <div className="arcade-intro">
      <p className="arcade-eyebrow">SIDE QUEST / 001</p>
      <h3>Sync the signals.</h3>
      <p>A tiny memory game for your next brain break. Flip two tiles, find their matching symbols, and connect all six pairs in as few moves as you can.</p>
      <p className="arcade-instructions" id="arcade-instructions">Click or tap a tile. On a keyboard, use Tab to move and Enter or Space to flip. No timer, no rush.</p>
      <button type="button" className="arcade-start" onClick={start}>{!started ? 'Start game' : complete ? 'Play again' : 'Restart game'} <span aria-hidden="true">↗</span></button>
    </div>
    <div className={`arcade-console ${complete ? 'arcade-complete' : ''}`}>
      <div className="arcade-score"><span>PAIRS <b>{matched.length / 2} / 6</b></span><span>MOVES <b>{String(moves).padStart(2, '0')}</b></span><span className="arcade-indicator" aria-hidden="true">{complete ? 'SYNCED' : started ? 'ONLINE' : 'STANDBY'}</span></div>
      <div className="arcade-board" role="group" aria-label="Signal matching cards" aria-describedby="arcade-instructions">
        {cards.map((card, index) => {
          const found = matched.includes(card.id);
          const visible = flipped.includes(card.id) || found;
          return <button type="button" key={card.id} className={`signal-card ${visible ? 'signal-visible' : ''} ${found ? 'signal-matched' : ''}`} aria-label={`Tile ${index + 1}: ${found ? `matched ${card.symbol}` : visible ? card.symbol : 'hidden'}`} aria-pressed={visible} aria-disabled={!started || found || complete} onClick={() => reveal(card)}>
            <span className="signal-symbol" aria-hidden="true">{visible ? card.symbol : '✦'}</span><span className="signal-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}{found ? ' / OK' : ''}</span>
          </button>;
        })}
      </div>
      <p className="arcade-message" role="status">{message}</p>
    </div>
  </div>;
}
