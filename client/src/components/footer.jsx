import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* עמוד הבית */}
          <div>
            <h3 className="text-lg font-semibold mb-4">SafeNet</h3>
            <p className="text-gray-600 text-sm">
              מחנכים את דור העתיד לגלישה בטוחה ואחראית ברשת
            </p>
          </div>
          
          {/* קישורים מהירים */}
          <div>
            <h3 className="text-lg font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 text-sm">דף הבית</a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-blue-600 text-sm">אודות</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-blue-600 text-sm">בלוג</a>
              </li>
              <li>
                <a href="/certification" className="text-gray-600 hover:text-blue-600 text-sm">הסמכה</a>
              </li>
            </ul>
          </div>
          
          {/* משפטי */}
          <div>
            <h3 className="text-lg font-semibold mb-4">משפטי</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-gray-600 hover:text-blue-600 text-sm">תנאי שימוש</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">מדיניות פרטיות</a>
              </li>
              <li>
                <a href="/accessibility" className="text-gray-600 hover:text-blue-600 text-sm">הצהרת נגישות</a>
              </li>
            </ul>
          </div>
          
          {/* צור קשר */}
          <div>
            <h3 className="text-lg font-semibold mb-4">צור קשר</h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">טופס יצירת קשר</a>
              </li>
              <li className="text-gray-600 text-sm">info@safenet.co.il</li>
              <li className="text-gray-600 text-sm">טל: 03-1234567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} SafeNet. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;