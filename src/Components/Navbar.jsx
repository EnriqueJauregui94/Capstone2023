import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/Navbar.css';
import { ShoppingCart } from 'phosphor-react'; // Assuming you have the 'phosphor-react' package installed

function Navbar() {
    return (
        <nav id="Navbar">
            <div className="Navbar-Container">
                <ul className="Nav-list">
                    {/* Place Shop, Login, Register, and Logout to the Right */}
                    <li className="Nav-item Nav-right">
                        <NavLink to="/">Shop</NavLink>
                    </li>
                    <li className="Nav-item Nav-right">
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li className="Nav-item Nav-right">
                        <NavLink to="/register">Register</NavLink>
                    </li>

                    {/* Cart */}
                    <li className="Nav-item">
                        <div>
                            <NavLink
                                to="/mycart"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <ShoppingCart size={26} />
                                </div>
                                <div style={{ fontSize: '12px' }}>My Cart</div>
                            </NavLink>
                        </div>
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
