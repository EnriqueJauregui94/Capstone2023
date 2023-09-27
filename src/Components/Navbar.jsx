import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/Navbar.css';

function Navbar() {
    return (
        <nav id="Navbar">
            <div className="Navbar-Container">
                <ul className="Nav-list">
                    <li className="Nav-item Nav-left">
                        <NavLink to="/shop">Shop</NavLink>
                    </li>
                    <li className="Nav-item">
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li className="Nav-item">
                        <NavLink to="/register">Register</NavLink>
                    </li>
                    <li className="Nav-item Nav-right">
                        <NavLink to="/logout">Logout</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
