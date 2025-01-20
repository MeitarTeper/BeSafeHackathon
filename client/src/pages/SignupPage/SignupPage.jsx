import React, { useState } from 'react';
import { signUp } from "../../services/user_api";
import { Link } from "react-router-dom";
import "../LoginPage/LoginPage.css"; 

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // מצב עבור אימייל
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        try {
            const response = await signUp(username, email, password);
            if (!response.success) {
                setErrorMessage('הרשמה נכשלה. נסה שוב.');
            } else {
                console.log('Signup successful');
            }
        } catch (error) {
            setErrorMessage('הרשמה נכשלה. נסה שוב.');
        }
    };

    return (
        <div className="login-container section-animate delay-1">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">הרשמה</h2>
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
                    <label htmlFor="email" className="login-label">אימייל:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
                <button
                    type="submit"
                    className="login-button button-hover"
                >
                    להרשמה
                </button>
                <Link to="/login" className="signup-button button-hover">
                    להתחברות
                </Link>
            </form>
        </div>
    );
}

export default SignUpForm;
