import React, { useState } from 'react';
import '../Styles/Login.css'; // Import your CSS styles here

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // You can perform authentication here (e.g., using an API)
        // For simplicity, we'll just trigger the login callback
        onLogin();
    };

    return (
        <div className="login-container">
            <h2>Please Log In</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Sign In</button>
        </div>
    );
}

export default Login;
