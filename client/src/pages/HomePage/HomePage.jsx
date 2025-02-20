import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  // Scroll reveal effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "איך מתחילים להשתמש במערכת?",
      answer: "התהליך פשוט - נרשמים דרך האתר, בוחרים את המסלול המתאים לגיל הילד, ומתחילים בלמידה חווייתית."
    },
    {
      question: "האם התכנים מותאמים לכל הגילאים?",
      answer: "כן, המערכת מציעה תכנים מותאמים לקבוצות גיל שונות, מגיל בית ספר יסודי ועד תיכון."
    },
    {
      question: "כמה זמן לוקח לסיים את המסלול?",
      answer: "משך הלמידה גמיש ומותאם אישית. בממוצע, ניתן לסיים את המסלול הבסיסי תוך כחודש."
    },
    {
      question: "האם מקבלים תעודה בסיום?",
      answer: "כן, בסיום המסלול מקבלים תעודת הסמכה רשמית המעידה על השלמת הקורס בהצלחה."
    },
    {
      question: "האם יש ליווי במהלך הלמידה?",
      answer: "בהחלט! צוות התמיכה שלנו זמין לכל שאלה, והמערכת מספקת משוב מיידי לאורך כל הדרך."
    },
    {
      question: "האם התכנים מתעדכנים?",
      answer: "כן, אנחנו מעדכנים את התכנים באופן שוטף בהתאם להתפתחויות הטכנולוגיות ואתגרי האינטרנט המשתנים."
    }
  ];

  return (
    <div className="font-rubik" dir="rtl">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden section-animate">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="w-1/2 relative">
              <div className="absolute w-full h-full rounded-3xl bg-[#F7C59F] transform rotate-6 top-6 left-6 -z-10" />
              <div className="absolute w-full h-full rounded-3xl bg-[#1A659E] transform -rotate-3 top-3 left-3 -z-20" />
              <img 
                src="/Home/hero-image.png" 
                alt="ילד לומד עם הורה" 
                className="rounded-3xl relative z-10 w-full h-[400px] object-cover"
              />
            </div>
            <div className="w-1/2 text-right">
              <h1 className="text-5xl font-bold mb-6">
                מגנים על הדור הבא<br />בעולם הדיגיטלי
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                המערכת עוזרת לילדים ללמוד בבטחה באינטרנט דרך<br />משחק וחוויה לימודית מהנה
              </p>
              <div className="flex gap-4">
                <Link to="/memory-game" className="button-hover bg-[#1A659E] text-white px-8 py-3 rounded-full">
                  התחילו עכשיו
                </Link>
                <Link to="/about" className="button-hover bg-white border-2 border-[#1A659E] text-[#1A659E] px-8 py-3 rounded-full">
                  קרא עוד
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative scroll-reveal">
        <img 
          src="/icons/illustration.svg" 
          alt="" 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-48"
        />
        <img 
          src="/illustration.png" 
          alt="" 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-48"
        />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-16">
            {[
              {
                icon: "/Home/icons/icon-security.svg",
                title: 'בטיחות מעל הכל',
                description: 'סביבת למידה מאובטחת ובטוחה\nהמותאמת לילדים ונוער'
              },
              {
                icon: "/Home/icons/icon-learning.svg",
                title: 'למידה חווייתית',
                description: 'שילוב של למידה עם משחק\nלהטמעה אפקטיבית יותר'
              },
              {
                icon: "/Home/icons/icon-certificate.svg",
                title: 'תעודת הסמכה',
                description: 'קבלת תעודה רשמית בסיום\nהמסלול הלימודי'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center feature-card">
                <div className="w-20 h-20 bg-[#EFEFD0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <img src={feature.icon} alt="" className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#EFEFD0] rounded-3xl p-12 flex">
            <div className="w-1/2 pl-12">
              <img 
                src="/Home/cta-image.png"
                alt="למידה משפחתית"
                className="rounded-3xl w-full h-[300px] object-cover"
              />
            </div>
            <div className="w-1/2 text-right">
              <h2 className="text-3xl font-bold mb-6">מוכנים להתחיל?</h2>
              <p className="text-gray-600 mb-8">
                הצטרפו לתוכנית שכבר עזרה לאלפי ילדים ללמוד על בטיחות ברשת בדרך מהנה ואפקטיבית
              </p>
              <Link to="/memory-game" className="button-hover bg-[#1A659E] text-white px-8 py-3 rounded-full">
                  התחילו עכשיו
                 </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-12">
            {[
              { value: '95%', label: 'שביעות רצון' },
              { value: '100+', label: 'בתי ספר משתתפים' },
              { value: '500+', label: 'תלמידים מוסמכים' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-[#FF6B35] text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 scroll-reveal">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-right">שאלות נפוצות</h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 faq-item">
                <button
                  className="w-full py-4 text-right flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown 
                    className={`transform transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="pb-4 text-gray-600 text-right">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
