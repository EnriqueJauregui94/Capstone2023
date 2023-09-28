import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Logout.css';

function Logout() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = () => {
        setIsLoggedOut(true);
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