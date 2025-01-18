import PropTypes from 'prop-types';

function PasswordRules({setCurrentScreen}) {
    const startGame = () => {
        setCurrentScreen("game");
    };
    return (
        <div className="rules-container">
            <div className="lock-photo"></div>
            <h1 id="title">ברוכים הבאים לאתגר הסיסמה החזקה</h1>
            <h1 id="subtitle">המטרה שלכם היא לבחור סיסמה חזקה למשתמש שלכם</h1>
            <div class = "mt-6 pt-4 border-t border-grey/20">
                <h1 id="subtitle2">:לפני שתתחילו, בואו ניזכר בהמלצות </h1>
                <p>1. על הסיסמה להיות באורך של 8 תווים לפחות</p>
                <p>2. על הסיסמה להכיל אותיות גדולות וקטנות</p>
                <p>3. על הסיסמה להכיל מספרים ותווים מיוחדים</p>
                <p>4. עדיף לא להשתמש במידע אישי כגון שמות ותאריכים</p>
                <p>5. אם אתם מחליפים סיסמה, על הסיסמה להיות שונה מהקודמת</p>
                <h2> חשוב לזכור: את הסיסמה לא משתפים עם אף אחד!</h2>
                <h1 id="subtitle2">בהצלחה!</h1>
            </div>
            <button className="btn" onClick={startGame}>התחל את השלב</button>
        </div>
    );
}

PasswordRules.propTypes = {
    setCurrentScreen: PropTypes.func.isRequired
};

export default PasswordRules;