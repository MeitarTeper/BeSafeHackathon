import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import MemoryGame from './pages/MemoryGame/MemoryGame';
import Completion from './pages/Completion/Completion'; // ייבוא של עמוד Completion

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          {/* כאן ניתן להוסיף קישורים לניווט */}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory-game" element={<MemoryGame />} />
          <Route path="/completion" element={<Completion />} /> {/* רוטה לעמוד Completion */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
