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
import PasswordGame from './pages/PasswordGame/PasswordGame';
import SupportPage from './pages/SupportPage/SupportPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import TermsPage from './pages/TermsPage/TermsPage';
const totalStages = 3;
const currentStage = 1;


function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memory-game" element={<MemoryGame currentStage={currentStage} totalStages={totalStages} />} />
            <Route path="/phishing-hunter" element={<PhishingHunter currentStage={currentStage+1} totalStages={totalStages}  />} />
            <Route path="/password-game" element={<PasswordGame currentStage={currentStage+1} totalStages={totalStages} />} />
            <Route path="/completion" element={<Completion />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="*" element={<Error />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/terms" element={<TermsPage />} />
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