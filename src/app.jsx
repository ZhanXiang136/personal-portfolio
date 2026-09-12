import Home from './pages/Home';
import StockTradingAI from './pages/StockTradingAI';

function App() {
  return window.location.pathname.toLowerCase() === '/stocktradingai'
    ? <StockTradingAI />
    : <Home />;
}

export default App;
