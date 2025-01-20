import { useState, useEffect } from 'react';
import styles from "./SupportPage.module.css";

const SupportPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      const message = { sender: 'User', text: inputMessage };
      socket.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
      setInputMessage('');
    }
  };

  return (
    <div className={styles.container}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: 'bold',  color: '#1A659E' }}>
          SafeNet כאן בשבילכם!
        </h1>

      <div
        style={{
          textAlign: 'center',
          color: '#1A659E', 
          backgroundColor: '#EFEFD0',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '1.25rem',
          marginBottom: '20px',
        }}
      >
         <p style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
          אנחנו מבינים את חשיבות התמיכה הרגשית
          ואת הצורך במקום בטוח לשתף ולבקש עזרה. נשמח לעמוד לצדכם ולספק לכם את הכלים הנדרשים
          להתמודדות בצורה בריאה וחיובית.
        </p>
      </div>

      <p>
        כאן תוכלו למצוא מידע חשוב, קישורים לשירותי חירום, עמותות, פסיכולוגים, וגם אפשרות לשוחח עם מומחה בצ&apos;אט אישי.
      </p>

      <section className={styles.section}>
        <h2>שירותי חירום</h2>
        <ul>
          <li><a href="tel:100">משטרה (100)</a></li>
          <li><a href="tel:101">מד&quot;א (101)</a></li>
          <li><a href="tel:1201">ער&quot;ן (1201)</a></li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>עמותות</h2>
        <ul>
          <li>
            <a href="https://www.sahar.org.il/" target="_blank" rel="noopener noreferrer">
              סהר - סיוע והקשבה ברשת
            </a>
          </li>
          <li>
            <a href="https://www.enosh.org.il/" target="_blank" rel="noopener noreferrer">
              עמותת אנוש
            </a>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>פסיכולוגים</h2>
        <ul>
          <li>
            <a href="https://www.betipulnet.co.il/חיפוש_מטפלים/פסיכולוגיה_חינוכית" target="_blank" rel="noopener noreferrer">
              פסיכולוגים חינוכיים
            </a>
          </li>
          <li>
            <a href="https://nefeshachat.co.il" target="_blank" rel="noopener noreferrer">
              עמותת נפש אחת
            </a>
          </li>
        </ul>
      </section>

      
    </div>
  );
};

export default SupportPage;
