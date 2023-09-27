import React from 'react';
import '../Styles/MyCart.css'; // Import the MyCart component's CSS

function MyCart({ cartItems, closeCart, removeFromCart, updateQuantity }) {
    return (
        <div className="cart-popup">
            <div className="cart-header">
                <h2>Your Cart</h2>
                <button onClick={closeCart}>Close</button>
            </div>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} />
                        <div className="cart-item-info">
                            <h3>{item.title}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                            <div className="cart-item-actions">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <h3>Total: ${calculateTotal(cartItems)}</h3>
            </div>
        </div>
    );
}

function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

export default MyCart;
