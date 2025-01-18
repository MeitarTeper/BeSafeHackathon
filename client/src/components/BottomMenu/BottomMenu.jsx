import "./BottomMenu.css";

function BottomMenu() {
    return (
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
    );
}

export default BottomMenu;