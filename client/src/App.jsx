import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
//import ChecklistPage from './pages/ChecklistPage/ChecklistPage';
import MemoryGame from './pages/MemoryGame/MemoryGame';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory-game" element={<MemoryGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;