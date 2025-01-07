import './HomePage.css';
import { useState } from 'react';
import descriptionIcon from '../../assets/description.png';
import infoIcon from '../../assets/info.png';
import shieldIcon from '../../assets/shield.png';
import govIcon from '../../assets/Gov.png';
import hinoohIcon from '../../assets/Hinooh.png';
import tlvUniIcon from '../../assets/TLV_Uni.png';
import supportImage from '../../assets/support.jpg';
import reportImage from '../../assets/report.jpg';

const Home = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <nav className="navbar">
          <div className="logo">SafeNet</div>
          <ul className="nav-links">
            <li><a href="#about">אודות</a></li>
            <li><a href="#services">שירותים</a></li>
            <li><a href="#contact">צור קשר</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>SafeNet</h1>
          <p>המקום הבטוח שלך להתמודדות עם בריונות ופגיעות ברשת.</p>
          
        </div>
      </section>

      {/* Highlighted Support Section */}
      <section className="highlighted-support-section">
        <div className="support-content">
          <div className="support-image" style={{ backgroundImage: `url(${supportImage})` }}></div>
          <div className="support-text">
            <h2>תמיכה רגשית</h2>
            <p>חיבור לשירותי חירום, עמותות ומומחים שיעזרו לך להתמודד עם אתגרי החיים.</p>
          </div>
        </div>
      </section>

      {/* Highlighted Report Section */}
      <section className="highlighted-report-section">
        <div className="report-content">
          <div className="report-text">
            <h2>הגשת תלונה</h2>
            <p>העלאת ראיות וקבלת מסמך תלונה מסודר להגשה לרשויות הרלוונטיות.</p>
          </div>
          <div className="report-image" style={{ backgroundImage: `url(${reportImage})` }}></div>
        </div>
      </section>

      {/* Support Lines Section */}
      <section className="support-lines-section">
        <h2>אל תישארו עם זה לבד.</h2>
        <p>מרכזי הסיוע לנפגעות ולנפגעי תקיפה מינית זמינים לתמיכה, ליווי והכוונה.</p>
        <div className="support-lines">
          <div className="support-line">
            <h3>1202</h3>
            <p>קו סיוע ע"י נשים</p>
          </div>
          <div className="support-line">
            <h3>1203</h3>
            <p>קו סיוע ע"י גברים</p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles-section">
        <h2>מאמרים מומלצים לגלישה בטוחה</h2>
        <div className="article-list">
          {[{ img: govIcon, title: "עצות לגלישה בטוחה", text: "קבלו טיפים מממשלת ישראל לשמירה על גלישה בטוחה.", link: "https://www.gov.il/he/pages/safe_surfing_tips" },
          { img: hinoohIcon, title: "התנהלות נכונה ברשת", text: "הנחיות ממשרד החינוך לגלישה בטוחה.", link: "https://parents.education.gov.il/prhnet/gov-education/safety/safe-surfing/optimal-conduct" },
          { img: tlvUniIcon, title: "כללי זהירות ברשת", text: "המלצות מהמכון לחקר החברה באוניברסיטת תל אביב.", link: "https://social-sciences.tau.ac.il/Surfingtips" }].map((article, index) => (
            <div key={index} className="article-item">
              <div className="article-image" style={{ backgroundImage: `url(${article.img})` }}></div>
              <div className="article-content">
                <h3>{article.title}</h3>
                <p>{article.text}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer">קרא עוד</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* Tips Section */}
      <section className="tips-section">
        <h2>המלצות לשימוש בטוח</h2>
        <ul className="tips-list">
          <li>הימנע משיתוף מידע אישי עם זרים ברשת.</li>
          <li>השתמש בסיסמאות חזקות וייחודיות לחשבונות שלך.</li>
          <li>אל תפתח קישורים או קבצים מאנשים שאינך מכיר.</li>
          <li>דווח על תוכן פוגעני או חשוד לפלטפורמה הרלוונטית.</li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>בואו נעשה שינוי יחד</h2>
        <div className="cta-buttons">
          <a href="/report" className="btn-primary">הגש תלונה</a>
          <a href="/support" className="btn-primary">קבל עזרה רגשית</a>
          <a href="/cyber-laws" className="btn-primary">למד על זכויותיך</a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>שאלות ותשובות</h2>
        <div className="faq-list">
          {[{ question: "איך מגישים תלונה באתר?", answer: "היכנסו לעמוד הגשת תלונה, מלאו את הטופס והעלו ראיות במידת הצורך." },
          { question: "איך אפשר לקבל תמיכה רגשית?", answer: "ניתן לפנות לעמוד תמיכה רגשית ולקבל קישור לעמותות או מומחים." },
          { question: "מהי מדיניות הפרטיות של האתר?", answer: "אנו מתחייבים לשמור על פרטיותך. כל המידע נשמר בצורה מאובטחת." },
          { question: "איך אני מגן על החשבון שלי?", answer: "השתמש בסיסמאות חזקות, הפעל אימות דו-שלבי, ואל תשתף פרטים אישיים." }].map((faq, index) => (
            <div key={index} className={`faq-item ${openQuestion === index ? "open" : ""}`}>
              <h3 onClick={() => toggleQuestion(index)}>
                {faq.question}
                <span>{openQuestion === index ? "-" : "+"}</span>
              </h3>
              {openQuestion === index && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>יצירת קשר</h3>
            <p>:אימייל</p>
            <p>:טלפון</p>
          </div>
          <div className="footer-section">
            <h3>קישורים מהירים</h3>
            <ul>
              <li><a href="#about">אודות</a></li>
              <li><a href="#services">שירותים</a></li>
              <li><a href="#contact">צור קשר</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>הרשמה לעדכונים</h3>
            <form>
              <input type="email" placeholder="הכנס כתובת אימייל" />
              <button type="submit">הרשם</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 BeSafe. כל הזכויות שמורות.</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
