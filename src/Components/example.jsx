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

    // Function to log out and clear cart data
    const logOut = () => {
        sessionStorage.removeItem('token');
        localStorage.removeItem('cartItems'); // Clear cart data from storage
        setToken('');
    };


    const handleLogout = () => {
        // Clear the user's cart data in local storage
        localStorage.removeItem('cartItems');

        // Reset cart state
        setCartItems([]);
        setCartItemCount(0);

        // Perform logout actions (e.g., clearing authentication token)
        // ...

        // Redirect to the login page or home page
        navigate('/login');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // ... (Your existing login logic)

            if (response.ok) {
                logIn(result.token);
                setMessage('Successfully Signed In');
                setError('');
                navigate('/shop'); // Redirect to '/shop' for successful login
            } else {
                // ... (Your existing error handling)
            }
        } catch (error) {
            // ... (Your existing error handling)
        }
    };
    return (
        <div className="logout-container">
            {!isLoggedOut ? (
                <>
                    <h2>Click the button to log out</h2>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <p>Successfully logged out!</p>
                    <p>
                        <Link to="/login" className="login-link">
                            Click Here To Log In!
                        </Link>
                    </p>
                </>
            )}
        </div>
    );
}

export default Logout;