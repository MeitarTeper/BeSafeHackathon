import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
//import ChecklistPage from './pages/ChecklistPage/ChecklistPage';
import MemoryGame from './pages/MemoryGame/MemoryGame';
import PasswordGame from './pages/PasswordGame/PasswordGame';

function App() {
  return (
    <BrowserRouter>
    <div>
      <nav>

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/password-game" element={<PasswordGame />} />
      </Routes>
    </div>
      
    </BrowserRouter>
  );
}

export default App;