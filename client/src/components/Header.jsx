import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

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
    { path: '/certification', label: 'הסמכה' },
    { path: '/blog', label: 'בלוג' },
    { path: '/support', label: 'תמיכה' }
  ];

  return (
    <header 
      className={`fixed top-0 right-0 left-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`} 
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-gray-600 hover:text-[#1A659E] transition-colors relative ${
                location.pathname === item.path ? 'text-[#1A659E]' : ''
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute right-0 left-0 bottom-0 h-0.5 bg-[#1A659E]" />
              )}
            </Link>
          ))}
        </nav>
        
        <Link to="/">
          <img src={logo} alt="SafeNet" className="h-8" />
        </Link>
      </div>
    </header>
  );
};

export default Header;