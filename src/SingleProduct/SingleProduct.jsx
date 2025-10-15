import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../stores/components/Navbar';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './SingleProduct.css'

function SingleProduct() {
  // useParams hook from react-router-dom to get the 'id' from the URL.
  const { id } = useParams(); // Gets the 'id' from the URL (e.g., "123")
  
  // State to hold the fetched product data.
  const [product, setProduct] = useState(null);

  // State to manage which image is currently displayed in the main view.
  const [selectedImage, setSelectedImage] = useState(null);

  // State to manage the loading status while fetching data.
  const [loading, setLoading] = useState(true);

  // useDispatch hook from react-redux to dispatch actions (e.g., addToCart).
  const dispatch = useDispatch();

  useEffect(() => {
    // Async function to fetch product data from the API based on the ID.
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // Fetch data for the specific product ID.
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
        // Set the first image from the product's image array as the default selected image.
        if (data && data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]); // The effect dependency array includes 'id', so it re-runs if the product ID changes.

  // Display a loading message while data is being fetched.
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display a message if the product could not be found or fetched.
  if (!product) {
    return <p>Product not found!</p>;
  }

  // Handler function to update the selectedImage state when a thumbnail is clicked.
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <Navbar />
      <div className="product-detail-page">
        {/* Product image gallery section */}
        <div className="product-gallery">
          <div className="main-image-container">
            {/* Display the currently selected image. */}
            {selectedImage && <img src={selectedImage} alt={product.title} className='single-image' />}
          </div>
          {/* Container for thumbnail images */}
          <div className="thumbnail-container">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail-item ${image === selectedImage ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(image)}
              >
                <img src={image} alt={`${product.title} thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        {/* Product details section (title, price, description, etc.) */}
        <div className="single-product-details">
          <p className="product-category">{product.category.name}</p>
          <h1 className='single-title'>{product.title}</h1>
          <h2 className='single-price'>${product.price}</h2>
          <p className='single-des'>{product.description}</p>
          {/* "Add to Cart" button dispatches the addToCart action with the current product. */}
          <button className='single-button' onClick={() => dispatch(addToCart(product))}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;