import { Routes, Route } from 'react-router-dom';
import GameBoard from './components/gameboard.jsx';
import GameAnalysis from './components/gameanalysis.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameBoard />} />
      <Route path="/analysis" element={<GameAnalysis />} />
    </Routes>
  );
}

export default App;
