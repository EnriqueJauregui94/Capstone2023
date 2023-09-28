import React, { useEffect } from 'react';
import '../Styles/MyCart.css';

function MyCart({ cartItems, closeCart, removeFromCart, updateQuantity }) {
    // Use localStorage to store and retrieve cart data
    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            const parsedCart = JSON.parse(cartData);
            if (parsedCart && parsedCart.length) {
            }
        }
    }, []);

    // Function to save the cart data to localStorage
    const saveCartToLocalStorage = (cartData) => {
        localStorage.setItem('cart', JSON.stringify(cartData));
    };

    useEffect(() => {
        saveCartToLocalStorage(cartItems);
    }, [cartItems]);

    return (
        <div className="cart-popup">
            <div className="cart-header">
                <h2>Your Cart</h2>
                <button onClick={closeCart}>x</button>
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