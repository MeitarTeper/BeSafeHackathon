import React from 'react';
import { Home } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-xl">
        {/* Error Number */}
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        
        {/* Main Message */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          אופס! העמוד לא נמצא
        </h2>
        
        {/* Explanation */}
        <p className="text-gray-600 mb-8">
          מצטערים, אבל העמוד שחיפשת לא קיים. יתכן שהוא הוסר או שכתובת ה-URL שגויה.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Home className="w-5 h-5 ml-2" />
            חזרה לדף הבית
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            חזרה לעמוד הקודם
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-gray-600">
          <p>צריכים עזרה?</p>
          <a 
            href="/contact" 
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            צרו איתנו קשר
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;