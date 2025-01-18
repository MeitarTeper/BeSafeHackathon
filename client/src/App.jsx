import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import MemoryGame from './pages/MemoryGame/MemoryGame';
import PhishingHunter from './pages/PhishingHunter/PhishingHunter'; // ייבוא המשחק
import Completion from './pages/Completion/Completion';
import About from './pages/AboutPage/AboutPage';
import Contact from './pages/ContactPage/ContactPage';
import Blog from './pages/BlogPage/BlogPage';
import BlogPost from './pages/BlogPage/BlogPost';
import Error from './pages/ErrorPage/ErrorPage';
import Header from './components/Header';
import Footer from './components/footer';
import CookieBanner from './components/CookieBanner/CookieBanner';
import TeacherPage from './pages/TeacherPage/TeacherPage';
import AccessibilityButton from './components/Accessibility/AccessibilityButton';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memory-game" element={<MemoryGame />} />
            <Route path="/phishing-hunter" element={<PhishingHunter />} /> {/* נתיב לשלב השני */}
            <Route path="/completion" element={<Completion />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
        <AccessibilityButton />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}

export default App;
