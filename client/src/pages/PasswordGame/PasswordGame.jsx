import "./PasswordGame.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PasswordRules from "./PasswordRules";
import Annie from '../../components/Annie';
import ProgressBar from '../../components/ProgressBar';


const totalStages = 3;
const currentStage = 2;

const PasswordGame = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [strengthScore, setStrengthScore] = useState(0);
    const [feedback, setFeedback] = useState([]);
    const [currentScreen, setCurrentScreen] = useState("start");
    const annieRef = useRef();

    let checksCount = 5;
    const navigate = useNavigate();

    const evaluatePassword = () => {  
        const feedbackMessages = [];   
        let score = 0;
    
        // Check length
        if (password.length >= 8) {
          score += 1;
        } else {
          feedbackMessages.push(`על הסיסמה להיות באורך של 8 תווים לפחות, לצערנו אורך הסיסמה שלך היא ${password.length} תווים.`);
        }
    
        // Check for uppercase letters
        if (/[A-Z]/.test(password)) {
          score += 1;
        } else {
          feedbackMessages.push("על הסיסמה להכיל גם אותיות גדולות וגם קטנות.");
        }
    
        // Check for numbers
        if (/\d/.test(password)) {
          score += 1;
        } else {
          feedbackMessages.push("על הסיסמה להכיל גם מספרים.");
        }
    
        // Check for special characters
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          score += 1;
        } else {
          feedbackMessages.push("על הסיסמה להכיל גם תווים מיוחדים.");
        }

        // Check if password contains the username
        if (password.toLowerCase().includes(userName.toLowerCase())) {
            feedbackMessages.push("עדיף שהסיסמה לא תכיל את שם המשתמש.");
        } else {
            score += 1;
        }
        console.log(feedbackMessages);
        setStrengthScore(score);
        setFeedback(feedbackMessages);

        if (score === checksCount) {
            setCurrentScreen("end");
            annieRef.current.hide();
        } else {
            annieRef.current.show("אני רואה שיש עוד מקום לשיפור. נסה שוב!");
        }
      };
    
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        setSubmitted(false); 
        annieRef.current.hide();
        
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
        annieRef.current.hide();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedbackMessages = [];
        if (!userName) {
            feedbackMessages.push("אנא הכנס שם משתמש.");
        }
         if (!password) {
            feedbackMessages.push("אנא הכנס סיסמה.");
        } 
        if (feedbackMessages.length > 0) {
            setFeedback(feedbackMessages);
        } else {
            evaluatePassword();
        }
        setSubmitted(true);
      };
    
      const handleShowInstructions = () => {
        setCurrentScreen("start");
        };

      const handleTryAgain = () => {
        setUserName("");
        setPassword("");
        setStrengthScore(0);
        setFeedback([]);
        setSubmitted(false);
        setCurrentScreen("game");
    };

    const handleNextLevel = () => {
        navigate("/phishing-hunter");
    };

    return (
        <div className="game-frame">
        <div className="password-challenge-container">
          {/* ProgressBar Component */}
            <ProgressBar currentStage={currentStage} totalStages={totalStages} />
            {currentScreen === "start" && (
                <div className="password-rules-container">
                    <PasswordRules setCurrentScreen={setCurrentScreen} />
                </div>
            )}

            {currentScreen === "game" && (
                <><button className="instructions-btn" onClick={handleShowInstructions}>הוראות</button>
                <h1 id="title">אתגר הסיסמה החזקה</h1><div className="form-group">
                        <h1 id="subtitle">בחר סיסמה ותראה כמה חזקה היא</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="username-input"
                                value={userName}
                                onChange={handleUserNameChange}
                                placeholder="הכנס שם משתמש" />
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="password-input"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="הכנס סיסמה" />
                                <label className="show-password">
                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={(e) => setShowPassword(e.target.checked)} />
                                    הצג סיסמה
                                </label>
                            </div>
                            <button type="submit" className="btn">בדוק סיסמה</button>
                        </form>
                    </div>
                
                        <Annie ref={annieRef} />
                {submitted && (
                    <div className="password-feedback">
                        <h3>הסיסמה שנבחרה: {password}</h3>
                        <h3>ציון הסיסמה: {strengthScore}/{checksCount}</h3>
                        <div
                            className="strength-bar"
                            style={{width: `${(strengthScore / checksCount) * 100}%`}}
                        ></div>
                        <ul className="feedback-list">
                            {feedback.map((msg, index) => (
                                <li key={index} className="feedback-item">
                                    {msg}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}</>
            )}

            {currentScreen === "end" && (
                <>
                <h1 id="title">אתגר הסיסמה החזקה</h1>
                <div className="completion-screen">
                        <h1 id="subtitle">כל הכבוד! סיימת את האתגר!</h1>
                        <button className="btn" onClick={handleTryAgain}>נסה שוב</button>
                        <button className="btn" onClick={handleNextLevel}>המשך לשלב הבא</button>
                </div></>
                
            )}  
            
        </div>
         </div>

    );
};

export default PasswordGame;
