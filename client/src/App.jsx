import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // ייבוא נכון של Link
import Home from './pages/HomePage/HomePage';
import MemoryGame from './pages/MemoryGame/MemoryGame'; // ייבוא של משחק הזיכרון

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
        
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory-game" element={<MemoryGame />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
