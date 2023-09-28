import React, { useEffect, useState } from 'react';
import MyCart from './MyCart';
import { createBrowserHistory } from 'history';
import '../Styles/Shop.css';

function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [sortingOption, setSortingOption] = useState('');
    const [editingProductId, setEditingProductId] = useState(null);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const history = createBrowserHistory();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            });
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSortingChange = (option) => {
        setSortingOption(option);

        fetch(`https://fakestoreapi.com/products?sort=${option}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching sorted data:', error);
            });
    };

    const addToCart = (item) => {
        const existingCartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

        if (existingCartItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingCartItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }

        setCartItemCount(cartItemCount + 1);
        setIsCartVisible(true); // Show the cart pop-up when adding an item
    };

    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
        setCartItemCount(cartItemCount - 1);
    };

    const updateQuantity = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
        recalculateCartItemCount(updatedCartItems);
    };

    const closeCart = () => {
        setIsCartVisible(false);
    };

    const recalculateCartItemCount = (updatedCartItems) => {
        const newCartItemCount = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(newCartItemCount);
    };

    return (
        <div className="Shop-Page">
            <h1>Products</h1>
            <div className="View-Cart-Button">
                <button onClick={() => setIsCartVisible(true)}>View Cart ({cartItemCount})</button>
            </div>
            <div className="Category-Buttons">
                <button onClick={() => handleCategoryChange('all')}>All</button>
                <button onClick={() => handleCategoryChange("men's clothing")}>Men's</button>
                <button onClick={() => handleCategoryChange("women's clothing")}>Women's</button>
                <button onClick={() => handleCategoryChange('electronics')}>Electronics</button>
                <button onClick={() => handleCategoryChange('jewelry')}>Jewelry</button>
                {isUserAuthenticated && <button onClick={addNewProduct}>Add New Product</button>}
            </div>
            <div className="Sort-Buttons">
                <div>
                    <label>Sort by Price:</label>
                    <select onChange={(e) => handleSortingChange(e.target.value)}>
                        <option value="">Select</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>
                <div>
                    <label>Sort by Category:</label>
                    <select onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="">Select</option>
                        <option value="all">All</option>
                        <option value="men's clothing">Men's</option>
                        <option value="women's clothing">Women's</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelry">Jewelry</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="Product-List">
                    {products
                        .filter((product) => {
                            if (selectedCategory === 'all') {
                                return true;
                            } else {
                                return product.category === selectedCategory;
                            }
                        })
                        .map((product) => (
                            <div key={product.id} className="Product-Item">
                                <img src={product.image} alt={product.title} />
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                                <p>Category: {product.category}</p>
                                <div>
                                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                </div>
            )}
            {isCartVisible && (
                <div className="Cart-Container">
                    <div className="Cart-Header">Cart</div>
                    <div className="Cart-Content">
                        <MyCart cartItems={cartItems} closeCart={closeCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                    </div>
                </div>
            )}
            {/* Display the CartPopup component */}
            {isCartVisible && (
                <div className="Cart-Popup-Container">
                    <MyCart cartItems={cartItems} closeCart={closeCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                </div>
            )}
        </div>
    );
}

export default Shop;
