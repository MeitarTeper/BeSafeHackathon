import React, { useState } from 'react';
import { signUp } from "../../services/user_api";
import { Link } from 'react-router-dom';

function LoginForm() {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Signup submitted:', { username, password });
        signUp(username, password);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '300px' }}>
                <h2 style={{ textAlign: 'center' }}>הרשמה</h2>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>משתמש:</label>
                    <input
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>סיסמה:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    להרשמה
                </button>
                <div>

                </div>
                <Link key='/login' to='/login'>להתחברות</Link>
            </form>
        </div>
    );
}

export default LoginForm;
