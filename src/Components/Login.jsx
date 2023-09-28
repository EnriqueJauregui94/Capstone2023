import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const APIURL = 'https://fakestoreapi.com';

export default function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const logIn = (newToken) => {
        console.log('Setting token in sessionStorage:', newToken);
        sessionStorage.setItem('token', newToken);
        setToken(newToken);

        // Retrieve the cart data from local storage
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
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
                setSuccessMessage(result.message);
                navigate('/shop'); // Change to '/shop' for redirection
            } else {
                setError(result.error);
                console.error('Login failed:', result.error);
            }
        } catch (error) {
            setError(error);
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
            {token && <p className="success-message">Login successful! Token: {token}</p>}
        </div>
    );
}
