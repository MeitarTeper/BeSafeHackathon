import { useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import './MemoryGame.css';
import logoImage from "../../assets/Logo.png";

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState('');
    const [showEndPopup, setShowEndPopup] = useState(false);
    const navigate = useNavigate();

    const cardData = useMemo(() => [
        { text: "אל תשתף כתובת בית", type: "danger" },
        { text: "סיסמה חזקה כוללת מספרים ותווים", type: "safe" },
        { text: "אל תלחץ על קישורים לא מוכרים", type: "danger" },
        { text: "דווח על בריונות רשת", type: "safe" },
        { text: "שמור על הפרטיות שלך ברשת", type: "safe" },
        { text: "זהה ניסיונות פישינג", type: "danger" },
        { text: "אל תמסור מידע אישי באינטרנט", type: "danger" },
    ], []);

    const startGame = useCallback(() => {
        const numPairs = 6;
        const selectedCards = cardData.slice(0, numPairs);
        const shuffledCards = [...selectedCards, ...selectedCards]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index, flipped: false }));

        setCards(shuffledCards);
        setMatchedPairs(0);
        setShowPopup(false);
        setShowEndPopup(false);
    }, [cardData]);

    useEffect(() => {
        startGame();
    }, [startGame]);

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
            setMatchedPairs((prevMatchedPairs) => {
                const newMatchedPairs = prevMatchedPairs + 1;

                // בדיקה אם כל הזוגות נמצאו
                if (newMatchedPairs === 6) {
                    setShowEndPopup(true); // מציג את הפופ-אפ בסיום
                    setTimeout(() => {
                        navigate('/completion'); // מעבר לעמוד Completion
                    }, 3000); // המתנה של 3 שניות
                }

                return newMatchedPairs;
            });

            // בדיקה אם לפחות אחד מהכרטיסים הוא "danger"
            if (cards[first].type === 'danger' || cards[second].type === 'danger') {
                setPopupContent(`זיהית פריט מסוכן ⚠️`);
                setShowPopup(true);

                // סגירה אוטומטית של הפופ-אפ לאחר 2 שניות
                setTimeout(() => {
                    setShowPopup(false);
                }, 2000);
            }
        } else {
            const newCards = [...cards];
            newCards[first].flipped = false;
            newCards[second].flipped = false;
            setCards(newCards);
        }
        setFlippedCards([]);
    };

    return (
        <div className="memory-game-container">
            <header className="home-header">
                <nav className="navbar">
                    <div className="logo">SafeNet</div>
                    <ul className="nav-links">
                        <li><a href="/">דף הבית</a></li>
                        <li><a href="#services">שירותים</a></li>
                        <li><a href="#contact">צור קשר</a></li>
                    </ul>
                </nav>
            </header>
            <h1>משחק זיכרון - בטיחות ברשת</h1>
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

            {/* פופ-אפ סכנה */}
            {/* פופ-אפ סכנה */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <button className="close-popup" onClick={() => setShowPopup(false)}>✖</button>
                        <p>{popupContent}</p>
                    </div>
                </div>
            )}


            {/* פופ-אפ הצלחה */}
            {showEndPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>🎉 !כל הכבוד 🎉</h2>
                        <p>!עברתם את השלב בהצלחה</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryGame;
