import "./PasswordRules.css";
import PropTypes from 'prop-types';
import LockPhoto from "../../assets/lock.jpg";

function PasswordRules({setCurrentScreen}) {
    const startGame = () => {
        setCurrentScreen("game");
    };
    return (
        <div className="rules-container">
            {/* <div className="lock-photo" style={{ backgroundImage: `url(${LockPhoto})` }}></div> */}
            {/* <img src={LockPhoto} className="lock-photo"  /> */}
            <div className="lock-photo"></div>
            <h1 className="title">ברוכים הבאים לאתגר הסיסמה החזקה</h1>
            <p>המטרה שלכם היא לבחור סיסמה חזקה למשתמש שלכם</p>
            <p>לפני שתתחילו, בואו ניזכר בהמלצות </p>
            <p>1. על הסיסמה להיות באורך של 8 תווים לפחות</p>
            <p>2. על הסיסמה להכיל אותיות גדולות וקטנות</p>
            <p>3. על הסיסמה להכיל מספרים ותווים מיוחדים</p>
            <p>4. עדיף לא להשתמש במידע אישי כגון שמות ותאריכים</p>
            <p>5. אם אתם מחליפים סיסמה, על הסיסמה להיות שונה מהקודמת</p>
            <h2> חשוב לזכור: את הסיסמה לא משתפים עם אף אחד!</h2>
            <h1>בהצלחה!</h1>
            <button className="btn" onClick={startGame}>התחל את האתגר</button>
        </div>
    );
}

PasswordRules.propTypes = {
    setCurrentScreen: PropTypes.func.isRequired
};

export default PasswordRules;