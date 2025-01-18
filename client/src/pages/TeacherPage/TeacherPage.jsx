import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
//import Reveal from 'reveal.js';
//import 'reveal.js/dist/reveal.css';
//import 'reveal.js/dist/theme/white.css';

const lessonPlan = [
    {
      time: "0-5 דקות",
      activity: "פתיחה והצגת הנושא",
      description: "הצגת נושא השיעור: בטיחות ברשת",
      tips: "שאלו את התלמידים כמה זמן הם מבלים באינטרנט וכיצד הם משתמשים בו"
    },
    {
      time: "5-15 דקות",
      activity: "משחק פתיחה אינטראקטיבי",
      description: "משחק זיכרון עם כרטיסיות המציגות מצבים שונים ברשת",
      tips: "עודדו דיון על המצבים השונים שהתלמידים רואים במשחק"
    },
    {
      time: "15-25 דקות",
      activity: "הצגת מקרים ודיון",
      description: "הצגת סיטואציות אמיתיות של סכנות ברשת",
      tips: "איך הייתם מגיבים במצב כזה? מה הייתם עושים אחרת?"
    },
    {
      time: "25-35 דקות",
      activity: "עבודה בקבוצות",
      description: "התלמידים מתחלקים לקבוצות ומקבלים תרחיש לניתוח",
      tips: "תנו לכל קבוצה תרחיש שונה ובקשו מהם להציג פתרונות"
    },
    {
      time: "35-42 דקות",
      activity: "הצגת פתרונות",
      description: "כל קבוצה מציגה את התרחיש שלה ואת הפתרונות שהציעה",
      tips: "עודדו את שאר הכיתה להציע פתרונות נוספים"
    },
    {
      time: "42-45 דקות",
      activity: "סיכום",
      description: "סיכום הנקודות העיקריות ומתן טיפים מעשיים",
      tips: "חזרו על הכללים העיקריים לבטיחות ברשת"
    }
  ];

const TeacherPage = () => {
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);

  return (
    <div className="font-rubik min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            ברוכים הבאים לעמוד המורים של SafeNet!
          </h1>
          <p className="text-xl text-center text-[#1A659E] mb-8">
            היי מורה, אנחנו פה בשבילך! 😊
            <br />
            מוכנים לעזור לך ללמד על בטיחות ברשת בצורה קלילה, חינוכית ומהנה.
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
            בעולם הדיגיטלי של היום, חינוך לשימוש נכון ובטוח ברשת הוא הכרחי. האתר שלנו נבנה במיוחד כדי לספק לך כלים, משחקים ותכנים מעשיים שתוכלי להעביר לתלמידים בצורה חווייתית.
          </p>
        </div>
      </section>

      {/* Lesson Plan Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">מערך שיעור לדוגמה</h2>
          <p className="text-gray-600 mb-8">
            מתחת מופיע מערך שיעור קליל וממוקד שאפשר להעביר ב-45 דקות. השיעור כולל משחקים, דיונים ופעילויות שיעזרו לתלמידים ללמוד לזהות סכנות ברשת ולהגיב אליהן בצורה נכונה.
          </p>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1A659E] text-white">
                <tr>
                  <th className="py-4 px-6 text-right">זמן</th>
                  <th className="py-4 px-6 text-right">פעילות</th>
                  <th className="py-4 px-6 text-right">תיאור</th>
                  <th className="py-4 px-6 text-right">טיפים למורה</th>
                </tr>
              </thead>
              <tbody>
                {lessonPlan.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6">{item.time}</td>
                    <td className="py-4 px-6 font-medium">{item.activity}</td>
                    <td className="py-4 px-6">{item.description}</td>
                    <td className="py-4 px-6 text-gray-600">{item.tips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Presentation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">מצגת מותאמת למערך השיעור</h2>
          <p className="text-gray-600 mb-8">
            כדי להפוך את ההדרכה לפשוטה עבורך, הכנו מצגת שמלווה את השיעור מההתחלה ועד הסוף. המצגת כוללת את כל הנקודות החשובות, שאלות לדיון ודוגמאות ויזואליות.
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="aspect-video bg-gray-100 mb-8 rounded-lg">
              {/* כאן תהיה תצוגה מקדימה של המצגת */}
            </div>
            
            <button
              onClick={() => setIsSlideModalOpen(true)}
              className="bg-[#1A659E] text-white px-8 py-3 rounded-full hover:bg-[#004E89] transition-colors inline-flex items-center gap-2"
            >
              <Download size={20} />
              להורדת המצגת
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#EFEFD0]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">אנחנו כאן בשבילך!</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            אם נתקלת בשאלה, בעיה, או סתם בא לך לשתף חוויה, צוות SafeNet תמיד זמין עבורך. ביחד, נוכל ללמד את הדור הבא איך לשמור על עצמם ולהפוך את האינטרנט למקום בטוח יותר.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <a
              href="mailto:support@safenet.co.il"
              className="text-[#1A659E] hover:underline"
            >
              support@safenet.co.il
            </a>
            <a
              href="tel:1-800-BE-SAFE"
              className="text-[#1A659E] hover:underline"
            >
              1-800-BE-SAFE
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherPage;