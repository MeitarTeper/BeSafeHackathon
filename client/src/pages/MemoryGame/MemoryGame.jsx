import { useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import './MemoryGame.css';

import logoImage from "../../assets/logo.svg";
import annieImage from "../../assets/Annie.png"; // ייבוא הדמות
import Annie from '../../components/Annie';
import ProgressBar from '../../components/ProgressBar';
import introBackgroundImage from "../../assets/images/illustration.png";



const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [currentStage, setCurrentStage] = useState(1);
    const [showIntro, setShowIntro] = useState(true); 
    const totalStages = 3; 
    const navigate = useNavigate();
    const annieRef = useRef();

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

                if (newMatchedPairs === 6) {
                    // ביטול הודעת פריט מסוכן אם המשחק מסתיים
                    annieRef.current.show('כל הכבוד 🎉\nהשלמת את השלב בהצלחה!');
                    setTimeout(() => {
                        if (currentStage === 1) {
                            annieRef.current.hide();
                            setCurrentStage((prevStage) => prevStage + 1);
                            navigate('/password-game'); // מעבר לשלב 2
                        } else {
                            navigate('/completion'); // סיום המשחק
                        }
                    }, 3000);
                }

                return newMatchedPairs;
            });

            // בדיקה אם לפחות אחד מהכרטיסים הוא "danger"
            if (
                cards[first].type === 'danger' ||
                cards[second].type === 'danger'
            ) {
                // הצגת הודעה רק אם המשחק לא הסתיים
                if (matchedPairs + 1 < 6) {
                    annieRef.current.show('זיהית פריט מסוכן ⚠️');

                    setTimeout(() => {
                        annieRef.current.hide();
                    }, 2000);
                }
            }
        } else {
            const newCards = [...cards];
            newCards[first].flipped = false;
            newCards[second].flipped = false;
            setCards(newCards);
        }
        setFlippedCards([]);
    };

    if (showIntro) {
        return (
            <div className="intro-screen">
            <div className="annie-intro-container"   style={{
                backgroundImage: `url(${introBackgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                
                <img src={annieImage} alt="Annie" className="annie-intro-image" />
                <div className="annie-speech-bubble">
                    ברוכים הבאים להכשרתכם כמומחי בטיחות ברשת!<br />
                    במהלך המסלול תלמדו לזהות איומים ולהגן על פרטיותכם ברשת.
                </div>
            </div>
            <button
                className="start-button"
                onClick={() => setShowIntro(false)}
            >
                בואו נתחיל
            </button>
        </div>
        );
    }

    return (
        <div className="game-frame">
            <div className="memory-game-container">
                {/* סרגל התקדמות */}
                <ProgressBar currentStage={currentStage} totalStages={totalStages} />

                <h1>משחק זיכרון</h1>
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

                {/* דמות עם בועת דיבור */}
                <Annie ref={annieRef} />
            </div>
        </div>
    );
};

export default MemoryGame;
