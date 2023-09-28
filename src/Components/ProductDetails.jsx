// ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import '../Styles/ProductDetails.css';
import Shop from './Shop.jsx';

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details using the provided API URL
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    }, [productId]);

    return (
        <div className="product-details-popup">
            {product ? (
                <div className="product-details-content">
                    <h2>{product.title}</h2>
                    <p>Price: ${product.price}</p>
                    <p>{product.description}</p>
                    <img src={product.image} alt={product.title} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetails;
