import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import ChecklistPage from './pages/ChecklistPage/ChecklistPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checklist" element={<ChecklistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;