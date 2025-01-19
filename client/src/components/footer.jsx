import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1A659E] text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">SafeNet</h3>
            <p className="text-white/80 text-sm">
              מחנכים את דור העתיד לגלישה בטוחה ואחראית ברשת
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">קישורים מהירים</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors text-sm">דף הבית</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors text-sm">אודות</Link>

              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white transition-colors text-sm">בלוג</Link>

              </li>
              <li>
                <Link to="/memory-game" className="text-white/80 hover:text-white transition-colors text-sm">הסמכה</Link>

              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">משפטי</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/terms" className="text-white/80 hover:text-white transition-colors text-sm">תנאי שימוש</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-white transition-colors text-sm">מדיניות פרטיות</Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-white/80 hover:text-white transition-colors text-sm">הצהרת נגישות</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">צור קשר</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors text-sm">טופס יצירת קשר</Link>
              </li>
              <li className="text-white/80 text-sm">info@safenet.co.il</li>
              <li className="text-white/80 text-sm">טל: 03-1234567</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-center text-white/80 text-sm">
            © {new Date().getFullYear()} SafeNet. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
