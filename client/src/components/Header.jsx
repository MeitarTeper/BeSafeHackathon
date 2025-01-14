import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = (e) => {
    e.stopPropagation();
    setIsSearchOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSearchOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-blue-600">
          SafeNet
        </a>
        
        <nav className="flex items-center space-x-8">
          <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">בית</a>
          <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">אודות</a>
          <a href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">בלוג</a>
          <a href="/certification" className="text-gray-600 hover:text-blue-600 transition-colors">הסמכה</a>
          
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {isSearchOpen ? (
              <input
                type="text"
                placeholder="חיפוש..."
                className="pl-10 pr-4 py-2 w-48 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                autoFocus
              />
            ) : (
              <button
                onClick={handleSearchClick}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Search size={20} />
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;