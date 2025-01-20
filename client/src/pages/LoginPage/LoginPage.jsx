import React, { useState } from 'react';
import { login } from "../../services/user_api";
import { Link } from 'react-router-dom';
import './LoginPage.css'; // חיבור לקובץ CSS המותאם

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // מצב עבור הודעות שגיאה

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // איפוס הודעת השגיאה
        try {
            const response = await login(username, password);
            if (!response.success) {
                setErrorMessage('משתמש לא קיים.');
            } else {
                console.log('Login successful');
                // ניתן לנתב את המשתמש לעמוד אחר כאן
            }
        } catch (error) {
            setErrorMessage('משתמש לא קיים.');
        }
    };

    return (
        <div className="login-container section-animate delay-1">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">התחברות</h2>
                <div className="login-input-group">
                    <label htmlFor="username" className="login-label">משתמש:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="login-input"
                    />
                </div>
                <div className="login-input-group">
                    <label htmlFor="password" className="login-label">סיסמה:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                </div>
                {errorMessage && ( // הצגת הודעת השגיאה אם קיימת
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
                <button
                    type="submit"
                    className="login-button button-hover"
                >
                    להתחברות
                </button>
                <Link to="/signup" className="signup-button button-hover">
                    להרשמה
                </Link>
            </form>
        </div>
    );
}

export default LoginForm;
