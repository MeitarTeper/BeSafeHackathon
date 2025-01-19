import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'בית' },
    { path: '/about', label: 'אודות' },
    { path: '/teacher', label: 'למורה' },
    { path: '/memory-game', label: 'הסמכה' },
    { path: '/blog', label: 'בלוג' },
    { path: '/support', label: 'תמיכה' }
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
      dir="rtl"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <nav className="flex items-center gap-8" role="navigation" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-gray-600 hover:text-[#1A659E] transition-colors relative ${
                isActive(item.path) ? 'text-[#1A659E]' : ''
              }`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              {item.label}
              {isActive(item.path) && (
                <div className="absolute right-0 left-0 bottom-0 h-0.5 bg-[#1A659E]" />
              )}
            </Link>
          ))}
        </nav>

        <Link to="/" aria-label="Go to Home">
          <img src={logo} alt="SafeNet Logo" className="h-8" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
