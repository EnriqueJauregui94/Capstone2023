import React, { useState } from 'react';
import '../Styles/Register.css';

const APIURL = 'https://fakestoreapi.com/users';
const LOGIN_URL = '/login';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    });

    const [registrationStatus, setRegistrationStatus] = useState({
        success: false,
        error: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(APIURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setRegistrationStatus({ success: true, error: '' });
            } else {
                const errorData = await response.json();
                setRegistrationStatus({ success: false, error: errorData.message });
            }
        } catch (error) {
            console.error('Registration error:', error);
            setRegistrationStatus({ success: false, error: 'An error occurred during registration.' });
        }
    };

    return (
        <div className="signup-page">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="password">Name:</label>
                    <input
                        type="name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/* Add other form fields here as needed */}
                <button type="submit">Sign Up</button>
            </form>
            {registrationStatus.error && <div className="error-message">{registrationStatus.error}</div>}
            {registrationStatus.success && (
                <div className="success-message">
                    Registration successful! You can now{' '}
                    <a href={LOGIN_URL}>log in</a>. {/* Link to the login page */}
                </div>
            )}
        </div>
    );
}

export default Register;
