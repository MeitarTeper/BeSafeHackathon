import React from 'react';

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
                <a href="/" className="text-white/80 hover:text-white transition-colors text-sm">דף הבית</a>
              </li>
              <li>
                <a href="/about" className="text-white/80 hover:text-white transition-colors text-sm">אודות</a>
              </li>
              <li>
                <a href="/blog" className="text-white/80 hover:text-white transition-colors text-sm">בלוג</a>
              </li>
              <li>
                <a href="/certification" className="text-white/80 hover:text-white transition-colors text-sm">הסמכה</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">משפטי</h3>
            <ul className="space-y-1">
              <li>
                <a href="/terms" className="text-white/80 hover:text-white transition-colors text-sm">תנאי שימוש</a>
              </li>
              <li>
                <a href="/privacy" className="text-white/80 hover:text-white transition-colors text-sm">מדיניות פרטיות</a>
              </li>
              <li>
                <a href="/accessibility" className="text-white/80 hover:text-white transition-colors text-sm">הצהרת נגישות</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">צור קשר</h3>
            <ul className="space-y-1">
              <li>
                <a href="/contact" className="text-white/80 hover:text-white transition-colors text-sm">טופס יצירת קשר</a>
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