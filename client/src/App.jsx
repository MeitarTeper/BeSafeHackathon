import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ייבוא נכון
import Home from './pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
