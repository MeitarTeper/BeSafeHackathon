import "./PasswordGame.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpMenu from "../../components/UpMenu/UpMenu";
import BottomMenu from "../../components/BottomMenu/BottomMenu";
import PasswordRules from "./PasswordRules";

const PasswordGame = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [strengthScore, setStrengthScore] = useState(0);
    const [feedback, setFeedback] = useState([]);
    const [currentScreen, setCurrentScreen] = useState("start");
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
        }
      };
    
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        setSubmitted(false); 
        
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
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
        navigate("/memory-game");
    };

    return (
        <div className="password-game-container">
            <div className="up-menu">
                <UpMenu />
            </div>

            <div className="password-challenge-container">
                {currentScreen === "start" && (
                    <div className="password-rules-container">
                        <PasswordRules setCurrentScreen={setCurrentScreen} />
                    </div>
                )}

                {currentScreen === "game" && (
                    <><button className="instructions-btn" onClick={handleShowInstructions}>הוראות</button>
                    <h1 className="title">אתגר הסיסמה החזקה</h1><div className="form-group">
                            <p>בחר סיסמה ותראה כמה חזקה היא</p>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="input-group"
                                    value={userName}
                                    onChange={handleUserNameChange}
                                    placeholder="הכנס שם משתמש" />
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input-group"
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
                    <><div class="firework-container">
                        <div class="firework"></div>
                        <div class="firework"></div>
                        
                    </div>
                    <h1 className="title">אתגר הסיסמה החזקה</h1>
                    <div className="completion-screen">
                            <h2>כל הכבוד! סיימת את האתגר!</h2>
                            <button className="btn" onClick={handleTryAgain}>נסה שוב</button>
                            <button className="btn" onClick={handleNextLevel}>המשך לשלב הבא</button>
                            <div className="kids-img"></div>
                    </div></>
                    
                )}    
            </div>

            <div className="bottom-menu">
                <BottomMenu />
            </div>
        </div>
        

    );
};

export default PasswordGame;
