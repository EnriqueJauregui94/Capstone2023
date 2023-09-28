import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const APIURL = 'https://fakestoreapi.com';

export default function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const logIn = (newToken) => {
        sessionStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const getToken = () => {
        return token || sessionStorage.getItem('token');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(APIURL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const result = await response.json();

            if (response.ok) {
                logIn(result.token);
                setMessage('Successfully Signed In');
                setError('');
                navigate('/shop'); // Redirect to '/shop' for successful login
            } else {
                setMessage('');
                setError('Invalid Username or Password');
                console.error('Login failed:', result.error);
            }
        } catch (error) {
            setMessage('');
            setError('An error occurred during login');
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="mor_2314"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="83r5^_"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
        </div>
    );
}