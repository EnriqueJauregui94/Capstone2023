import React, { useEffect, useState } from 'react';
import MyCart from './MyCart'; // Import the MyCart component
import { createBrowserHistory } from 'history';
import '../Styles/Shop.css';

function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [sortingOption, setSortingOption] = useState(''); // State to store sorting option

    // State to manage editing mode for a product
    const [editingProductId, setEditingProductId] = useState(null);

    // State to track user authentication
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false); // Set this state based on your authentication logic

    // State to manage cart visibility
    const [isCartVisible, setIsCartVisible] = useState(false);

    // Create a history object
    const history = createBrowserHistory();

    useEffect(() => {
        // Fetch products when the component mounts
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            });
    }, []);

    const handleCategoryChange = (category) => {
        // Filter products based on the selected category
        setSelectedCategory(category);
    };

    // Function to handle sorting options change
    const handleSortingChange = (option) => {
        // Set the sorting option
        setSortingOption(option);

        // Fetch sorted data based on the selected sorting option
        fetch(`https://fakestoreapi.com/products?sort=${option}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching sorted data:', error);
            });
    };

    // Function to add an item to the cart
    const addToCart = (item) => {
        const existingCartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

        if (existingCartItemIndex !== -1) {
            // If the item is already in the cart, update its quantity
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingCartItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            // If the item is not in the cart, add it with a quantity of 1
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }

        setCartItemCount(cartItemCount + 1);
    };

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
        setCartItemCount(cartItemCount - 1);
    };

    // Function to update the quantity of an item in the cart
    const updateQuantity = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
        recalculateCartItemCount(updatedCartItems);
    };

    // Function to recalculate the total number of items in the cart
    const recalculateCartItemCount = (updatedCartItems) => {
        const newCartItemCount = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(newCartItemCount);
    };

    const closeCart = () => {
        setIsCartVisible(false);
    };

    return (
        <div className="Shop-Page">
            <h1>Products</h1>
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
            <button onClick={() => setIsCartVisible(!isCartVisible)}>Cart ({cartItemCount})</button>
            {isCartVisible && (
                <div className="Cart-Container">
                    <div className="Cart-Header">Cart</div>
                    <div className="Cart-Content">
                        <MyCart cartItems={cartItems} closeCart={closeCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Shop;
