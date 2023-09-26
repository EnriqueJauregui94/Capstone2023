import React from 'react';

function MyCart({ cartItems, closeCart, removeFromCart, updateQuantity }) {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="Cart-Popup">
            <button onClick={closeCart} className="Close-Cart">Close</button>
            <h2>Your Cart</h2>
            <div className="Cart-Items">
                {cartItems.map((item) => (
                    <div key={item.id} className="Cart-Item">
                        <div>
                            <img src={item.image} alt={item.title} width="80" height="80" /> {/* Display the product image */}
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                        </div>
                        <div>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            />
                            <p>Total: ${item.price * item.quantity}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="Cart-Total">
                <h3>Total Amount: ${calculateTotal()}</h3>
            </div>
        </div>
    );
}

export default MyCart;
