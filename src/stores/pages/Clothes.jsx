import { useState, useEffect } from "react";
import "../../App.css";
import Navbar from "../components/Navbar";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductsNotFound } from "./ProductsNotFound";


function ClothesSection() {
  // State to store the fetched data, loading status, and any errors.
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Define the async function to fetch data inside useEffect
    async function fetchData() {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=50');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        // Filter for "Clothes" and ensure the product has valid images.
        const clothesProducts = result.filter(
          (product) =>
            product.category.name === 'Clothes' &&
            Array.isArray(product.images) &&
            product.images.length > 0
        );
        
        console.log(clothesProducts);
        setProducts(clothesProducts);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    // Call the fetch function
    fetchData();
  }, []); // The empty dependency array [] ensures this effect runs only once.

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Render the fetched data
  return (
    <>
      <Navbar />
      <div className="product-container">
        <h1 className="product-title">Clothes</h1>
        <div className="pro-section">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.images[0]} alt={product.title} className="product-image" />
                </Link>
                <h4>{product.title}</h4>
                <div className="product-details">
                  <p className="product-price">${product.price}</p>
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="add-to-cart-button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p><ProductsNotFound /></p>
          )}
        </div>
      </div>
    
    </>
  );
}

export default ClothesSection;