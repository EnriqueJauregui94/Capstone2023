import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Shop.jsx'

// Define the API URL for fetching product details
const APIURL = 'https://fakestoreapi.com';

export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // Fetch product details using the API URL and productId
                const response = await fetch(`${APIURL}/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const productData = await response.json();
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    return (
        <div className="product-detail-container">
            <h1>Product Details Page</h1>
            {product && (
                <div className="product-detail-card">
                    <h2>{product.title}</h2>
                    <p>Price: ${product.price}</p>
                    <p>{product.category}</p>
                    <p>{product.description}</p>
                    <img src={product.image} alt={product.title} />
                </div>
            )}
        </div>
    );
}
