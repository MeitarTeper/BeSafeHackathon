import React, { useState } from 'react';
import './AccessibilityButton.css';

const AccessibilityButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [textSize, setTextSize] = useState('medium');
  const [colorMode, setColorMode] = useState('default');
  const [fontType, setFontType] = useState('default');

  const handleTextSize = (size) => {
    document.documentElement.style.fontSize = size === 'large' ? '1.25em' : '1em';
    setTextSize(size);
  };

  const handleColorMode = (mode) => {
    if (mode === 'highContrast') {
      document.body.style.filter = 'contrast(150%)';
    } else {
      document.body.style.filter = '';
    }
    setColorMode(mode);
  };

  const handleFontType = (type) => {
    document.body.style.fontFamily = type === 'accessible' ? 'Arial, sans-serif' : '';
    setFontType(type);
  };

  return (
    <div className="accessibility-container">
      <button
        className="accessibility-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ♿
        <span className="close-icon" onClick={() => setIsMenuOpen(false)}>×</span>
      </button>
      {isMenuOpen && (
        <div className="accessibility-menu">
          <h3>התאמות נגישות</h3>
          <ul>
            <li onClick={() => handleTextSize(textSize === 'medium' ? 'large' : 'medium')}>
              {textSize === 'medium' ? 'הגדל טקסט' : 'הקטן טקסט'}
            </li>
            <li onClick={() => handleColorMode(colorMode === 'default' ? 'highContrast' : 'default')}>
              {colorMode === 'default' ? 'מצב ניגודיות גבוהה' : 'מצב רגיל'}
            </li>
            <li onClick={() => handleFontType(fontType === 'default' ? 'accessible' : 'default')}>
              {fontType === 'default' ? 'שנה לגופן נגיש' : 'שנה לגופן רגיל'}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccessibilityButton;
