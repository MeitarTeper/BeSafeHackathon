import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './CookieBanner.css';

const CookieBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // נגדיר את ברירת המחדל של ההעדפות
  const defaultPreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  };

  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    try {
      const savedConsent = Cookies.get('cookieConsent');
      if (savedConsent) {
        const parsedConsent = JSON.parse(savedConsent);
        setIsOpen(false);
        setPreferences(parsedConsent);
      }
    } catch (error) {
      console.error('Error parsing cookie consent:', error);
      // במקרה של שגיאה, נמחק את העוגייה הקיימת ונשתמש בברירת המחדל
      Cookies.remove('cookieConsent');
    }
  }, []);

  const handleAcceptAll = () => {
    const allEnabled = {
      ...defaultPreferences,
      analytics: true,
      marketing: true,
      functional: true
    };
    try {
      Cookies.set('cookieConsent', JSON.stringify(allEnabled), { expires: 365 });
      setPreferences(allEnabled);
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  const handleSavePreferences = () => {
    try {
      Cookies.set('cookieConsent', JSON.stringify(preferences), { expires: 365 });
      setIsOpen(false);
      setShowPreferences(false);
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    }
  };

  const handleRejectAll = () => {
    try {
      Cookies.set('cookieConsent', JSON.stringify(defaultPreferences), { expires: 365 });
      setPreferences(defaultPreferences);
      setShowPreferences(false);
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving cookie rejection:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cookie-banner-container">
        <div className="cookie-banner-title">
          <span className="cookie-emoji">🍪</span>
          <span>רוצה עוגיה?</span>
        </div>
        <p className="cookie-banner-text">
          אנחנו משתמשים בעוגיות כדי לספק לך את החוויה הטובה ביותר באתר שלנו.
        </p>
        <div className="cookie-banner-buttons">
          <button className="cookie-accept-btn" onClick={handleAcceptAll}>
            קבל את כל העוגיות
          </button>
          <button className="cookie-manage-btn" onClick={() => setShowPreferences(true)}>
            ניהול העדפות
          </button>
        </div>
      </div>

      {showPreferences && (
        <div className="cookie-modal">
          <div className="cookie-modal-content">
            <h3 className="text-xl font-bold mb-4">הגדרות העוגיות</h3>
            
            <div className="space-y-4">
              <div className="cookie-preference">
                <div>
                  <div className="cookie-preference-label">עוגיות הכרחיות</div>
                  <div className="cookie-preference-description">
                    נדרשות לתפקוד האתר
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="accent-[#FF6B35]"
                />
              </div>

              <div className="cookie-preference">
                <div>
                  <div className="cookie-preference-label">עוגיות אנליטיקה</div>
                  <div className="cookie-preference-description">
                    עוזרות לנו להבין איך משתמשים באתר
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                  className="accent-[#FF6B35]"
                />
              </div>

              <div className="cookie-preference">
                <div>
                  <div className="cookie-preference-label">עוגיות שיווקיות</div>
                  <div className="cookie-preference-description">
                    משמשות להתאמת תוכן שיווקי
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                  className="accent-[#FF6B35]"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                דחה הכל
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-[#1A659E] text-white rounded-full hover:bg-[#004E89]"
              >
                שמור העדפות
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;