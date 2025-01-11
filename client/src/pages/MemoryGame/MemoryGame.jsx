import React, { useState, useEffect } from 'react';
import './MemoryGame.css';
import { Link } from 'react-router-dom';
import logoImage from 'C:/Users/noamo/Desktop/Hackaton/BeSafeHackathon/client/src/assets/Logo.png';



const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [difficulty, setDifficulty] = useState('easy');
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState('');
    const [showEndPopup, setShowEndPopup] = useState(false);

    const cardData = [
        { text: "אל תשתף כתובת בית", type: "danger" },
        { text: "סיסמה חזקה כוללת מספרים ותווים", type: "safe" },
        { text: "אל תלחץ על קישורים לא מוכרים", type: "danger" },
        { text: "דווח על בריונות רשת", type: "safe" },
        { text: "שמור על הפרטיות שלך ברשת", type: "safe" },
        { text: "זהה ניסיונות פישינג", type: "danger" },
    ];

    const difficulties = {
        easy: 6,
        medium: 8,
        hard: 12,
    };

    useEffect(() => {
        startGame();
    }, [difficulty]);

    const startGame = () => {
        const numPairs = difficulties[difficulty] / 2;
        const selectedCards = cardData.slice(0, numPairs);
        const shuffledCards = [...selectedCards, ...selectedCards]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index, flipped: false }));

        setCards(shuffledCards);
        setMatchedPairs(0);
        setShowPopup(false);
        setShowEndPopup(false);
    };

    const handleCardClick = (index) => {
        if (flippedCards.length === 2 || cards[index].flipped) return;

        const newCards = [...cards];
        newCards[index].flipped = true;
        setCards(newCards);

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setTimeout(() => {
                checkMatch(newFlippedCards);
            }, 1000);
        }
    };

    const checkMatch = (flippedCards) => {
        const [first, second] = flippedCards;
        if (cards[first].text === cards[second].text) {
            setMatchedPairs(matchedPairs + 1);
            if (cards[first].type === 'danger') {
                setPopupContent(` זיהית פריט מסוכן: ${cards[first].text} ⚠️`);
                setShowPopup(true);
            }
            if (matchedPairs + 1 === difficulties[difficulty] / 2) {
                setTimeout(() => {
                    setShowEndPopup(true);
                }, 500);
            }
        } else {
            const newCards = [...cards];
            newCards[first].flipped = false;
            newCards[second].flipped = false;
            setCards(newCards);
        }
        setFlippedCards([]);
    };

    const handleNextLevel = () => {
        const levels = ['easy', 'medium', 'hard'];
        const currentIndex = levels.indexOf(difficulty);
        if (currentIndex < levels.length - 1) {
            setDifficulty(levels[currentIndex + 1]);
        } else {
            alert('כל הכבוד! סיימתם את כל השלבים!');
        }
    };

    return (

        <div className="memory-game-container">
            {/* Header */}
            <header className="home-header">
                <nav className="navbar">
                    <div className="logo">SafeNet</div>
                    <ul className="nav-links">
                        <li><Link to="/">דף הבית</Link></li>
                        <li><a href="#services">שירותים</a></li>
                        <li><a href="#contact">צור קשר</a></li>
                    </ul>
                </nav>
            </header>
            
            <h1>משחק זיכרון - בטיחות ברשת</h1>
            <div className="difficulty-selector">
                <button
                    className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
                    onClick={() => setDifficulty('hard')}
                >
                    קשה
                </button>
                <button
                    className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
                    onClick={() => setDifficulty('medium')}
                >
                    בינוני
                </button>
                <button
                    className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
                    onClick={() => setDifficulty('easy')}
                >
                    קל
                </button>


                <p>:בחר רמת קושי</p>
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <button className="close-popup" onClick={() => setShowPopup(false)}>✖</button>
                        <p>{popupContent}</p>
                    </div>
                </div>
            )}
            {showEndPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>🎉 כל הכבוד! סיימתם את השלב בהצלחה!</p>
                        <button className="next-level-btn" onClick={handleNextLevel}>מעבר לשלב הבא</button>
                    </div>
                </div>
            )}
            <div className="memory-game">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`memory-card ${card.flipped ? "flipped" : ""}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="front-face">
                            <img src={logoImage} alt="Logo" className="logo-image" />
                        </div>

                        <div className="back-face">{card.text}</div>
                    </div>
                ))}
            </div>
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

export default MemoryGame;
