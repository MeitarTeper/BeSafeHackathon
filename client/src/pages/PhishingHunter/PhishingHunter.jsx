import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PhishingHunter.module.css";
import logoImage from "../../assets/Logo.svg";
import Annie from '../../components/Annie';
import ProgressBar from '../../components/ProgressBar';

const totalStages = 3;
const currentStage = 3;

const messages = [
  { id: 1, text: "וואו! זכית במנוי חינם לכל החיים למשחק Minecraft! לחץ כאן כדי לדרוש את הפרס שלך.", isPhishing: true },
  { id: 2, text: "מישהו פרסם תמונה שלך בקבוצה! לחץ כאן כדי לראות.", isPhishing: true },
  { id: 3, text: "נזכרת שהיום שיעור ספורט? אל תשכח להביא נעלי ספורט.", isPhishing: false },
  { id: 4, text: "החשבון שלך ב-Roblox נסגר זמנית. לחץ כאן כדי לשחזר אותו.", isPhishing: true },
  { id: 5, text: "חבר שלך שלח לך קובץ: חופשה_בפארק.zip.", isPhishing: false },
  { id: 6, text: "חדש! קבל חבילה עם 1,000 V-Bucks חינם ב-Fortnite! לחץ כאן עכשיו.", isPhishing: true },
  { id: 7, text: "תזכורת: מחר הטיול השנתי. אל תשכח להביא מים וכובע.", isPhishing: false },
  { id: 8, text: "התגלתה בעיה עם החשבון שלך ב-TikTok. לחץ כאן כדי לפתור.", isPhishing: true },
  { id: 9, text: "חבר שלך שלח לך מתנה ב-Brawl Stars! לחץ כאן כדי לקבל אותה.", isPhishing: true },
  { id: 10, text: "המורה הזכירה שבשבוע הבא מבחן במדעים. כדאי להתכונן.", isPhishing: false },
];

const PhishingHunter = () => {
  const [score, setScore] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  const annieRef = useRef();

  const handleGuess = (isSafe) => {
    const currentMessage = messages[currentMessageIndex];

    if ((isSafe && !currentMessage.isPhishing) || (!isSafe && currentMessage.isPhishing)) {
      setScore((prevScore) => prevScore + 1);
      annieRef.current.show("נכון! כל הכבוד!");
    } else {
      annieRef.current.show("שגוי! שים לב יותר.");
    }

    setTimeout(() => {
      annieRef.current.hide();
      if (currentMessageIndex === messages.length - 1) {
        setFinished(true);
      } else {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      }
    }, 2000);
  };

  useEffect(() => {
    if (finished) {
      if (score >= 8) {
        const timeout = setTimeout(() => {
          navigate("/completion"); // מעבר לעמוד התעודה
        }, 5000);
        return () => clearTimeout(timeout);
      }
    }
  }, [finished, navigate, score]);

  const restartGame = () => {
    setScore(0);
    setCurrentMessageIndex(0);
    setFinished(false);
    annieRef.current.hide();
  };

  const getFinalMessage = () => {
    if (score < 8) {
      return "כדי לעבור לשלב הבא, עליך לענות נכון על לפחות 8 שאלות!";
    }
    const percentage = (score / messages.length) * 100;
    if (percentage > 70) {
      return "כל הכבוד! אתה מלך הפישינג!";
    } else if (percentage >= 60) {
      return "עבודה טובה, אבל יש לך עוד מה ללמוד!";
    } else {
      return "יש לך עוד על מה לעבוד! נסה שוב.";
    }
  };

  return (
    <div className="game-frame">
      <div className={styles.container}>
        <ProgressBar currentStage={currentStage} totalStages={totalStages} />
        <h1 className={styles.title}>צייד הפישינג</h1>
        <p className={styles.instructions}>קרא את ההודעה והחליט אם היא בטוחה או מסוכנת!</p>

        {!finished ? (
          <>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${(currentMessageIndex / messages.length) * 100}%` }}
              ></div>
            </div>

            <div className={styles.messageBox}>
              <img src={logoImage} alt="Logo" className={styles.logo} />
              {messages[currentMessageIndex].text}
            </div>

            <div className={styles.buttons}>
              <button onClick={() => handleGuess(false)} className={styles.phishingButton}>
                מסוכן
              </button>
              <button onClick={() => handleGuess(true)} className={styles.safeButton}>
                בטוח
              </button>
            </div>
            <Annie ref={annieRef} />

            <p className={styles.score}>ניקוד: {score}</p>
          </>
        ) : (
          <div className={styles.messageBox}>
            <img src={logoImage} alt="Logo" className={styles.logo} />
            <p>{getFinalMessage()}</p>
            {score < 8 ? (
             <button onClick={restartGame} className={styles.retryButton}>
             נסה שוב
           </button>
           
            ) : (
              <button onClick={() => navigate("/completion")} className={styles.nextLevelButton}>
                המשך לשלב הבא
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhishingHunter;
