import React, { useState, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import {getLessons} from "../../services/lessons_api";
//import Reveal from 'reveal.js';
//import 'reveal.js/dist/reveal.css';
//import 'reveal.js/dist/theme/white.css';
import LessonPlanUpload from "./LessonPlanUpload";
import LessonPlansList from './LessonPlansList';

const lessonPlan = [
  {
    time: "0-10 דקות",
    activity: "פתיחה והצגת הנושא",
    description: "הצגת הנושא- בטיחות ברשת תוך מתן דוגמאות מעולמם של התלמידים",
    tips: "שאלו את התלמידים כמה זמן הם מבלים באינטרנט ואילו כללים חשובים הם מכירים?"
  },
  {
    time: "10-20 דקות",
    activity: "משחק זיכרון",
    description: "משחק זיכרון שבו התלמידים לומדים להבחין בין פריטים מסוכנים ובטוחים ברשת",
    tips: "בקשו מהתלמידים להסביר לאחר כל התאמה למה הפריט מסוכן"
  },
  {
    time: "20-30 דקות",
    activity: "אתגר הסיסמא",
    description: "משחק שמטרתו ללמד את התלמידים כיצד ליצור סיסמאות חזקות ובטוחות",
    tips: "הסבירו מדוע חשוב לשלב אותיות, מספרים ותווים מיוחדים, קראו איתם את ההוראות ורשמו על הלוח לפני תחילת המשחק"
  },
  {
    time: "30-40 דקות",
    activity: "צייד הפישינג",
    description: "משחק זיהוי הודעות פישינג שהילדים עלולים לקבל וצריכים לחשוד",
    tips: "ציינו את החשיבות של שימת לב לפרטים הקטנים כמו קישורים, שגיאות כתיב ומידע אישי כשנדרש"
  },
  {
    time: "40-45 דקות",
    activity: "סיכום ותעודת הסמכה",
    description: "יצירת תעודת הסמכה כיתתית וסיכום החומר",
    tips: "שאלו את התלמידים מה הם למדו היום, איך יישמו זאת ותמלאו איתם את שם הכיתה"
  },

];

const TeacherPage = () => {
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [lessonPlans, setLessonPlans] = useState([]);

  // Fetch lessons when the component mounts
  useEffect(() => {
    const fetchLessons = async () => {
        const lessons = await getLessons();
        setLessonPlans(lessons || []); // Ensure it defaults to an empty array if no lessons
    };

    fetchLessons();
}, []);

  // Handler for adding a new lesson plan
  const handleAddLessonPlan = (newLessonPlan) => {
    console.log('Adding new lesson plan:', newLessonPlan);
    setLessonPlans((prevLessonPlans) => [...prevLessonPlans, newLessonPlan]);
  };
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
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#1A659E] text-white px-8 py-3 rounded-full hover:bg-[#004E89] transition-colors inline-flex items-center gap-2"
            onClick={() => {
              const pdfSection = document.getElementById("pdf-section");
              if (pdfSection) {
                pdfSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            פוסטר לזיהוי חרם
          </button>
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
            {/* תצוגת PDF בתוך iframe */}
            <div className="aspect-video bg-gray-100 mb-8 rounded-lg overflow-hidden">
              <iframe
                src="/src/assets/presentations/For_teachers.pdf#toolbar=0"
                width="100%"
                height="500"
                className="rounded-lg"
                title="מצגת בטיחות ברשת"
              />
            </div>
  
            {/* כפתור להורדת המצגת */}
            <a
              href="/src/assets/presentations/For_teachers.pptx"
              download
              className="bg-[#1A659E] text-white px-8 py-3 rounded-full hover:bg-[#004E89] transition-colors inline-flex items-center gap-2"
            >
              <Download size={20} />
              להורדת המצגת
            </a>
          </div>
        </div>
      </section>
  
      {/* Lesson Plan Upload Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">העלאת מערכי שיעור</h2>
          <p className="text-gray-600 mb-8">
            שתפו את מערכי השיעור שלכם עם מורים אחרים כדי לעזור להם ללמד בצורה יצירתית ומגוונת!
          </p>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            {/* Embed the LessonPlanUpload component here */}
            <LessonPlanUpload onAddLessonPlan={handleAddLessonPlan} />
          </div>
        </div>
      </section>
  
      {/* List of Uploaded Lesson Plans */}
      <section className="py-16 bg-gray-50">
        <LessonPlansList lessonPlans={lessonPlans} />
      </section>
  
      {/* PDF Section */}
      <section id="pdf-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">סימנים לזיהוי חרם</h2>
          <p className="text-gray-600 mb-8">
            כאן תוכלו למצוא PDF המכיל מידע נוסף שיעזור לכם בהוראה על בטיחות ברשת.
          </p>
  
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="/src/assets/presentations/Herem.pdf#toolbar=0"
                width="100%"
                height="100%"
                className="w-full h-full"
                title="PDF להורדה"
              />
            </div>
  
            <div className="flex justify-center mt-4">
              <a
                href="/src/assets/presentations/Herem.pdf"
                download
                className="bg-[#1A659E] text-white px-8 py-3 rounded-full hover:bg-[#004E89] transition-colors inline-flex items-center gap-2"
              >
                <Download size={20} />
                להורדת ה-PDF
              </a>
            </div>
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