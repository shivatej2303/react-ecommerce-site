
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import './Products.css'



function ProductsSection() {
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
        // Remove the filter to show all products.

        // --- Start: Log all unique categories ---
        const allCategories = [...new Set(result.map(product => product.category.name))];
        console.log("All available categories from the API:", allCategories);
        // --- End: Log all unique categories ---

        // We'll still check for valid image arrays to prevent errors.
        let productsToDisplay = result.filter(product => Array.isArray(product.images) && product.images.length > 0);

        // Shuffle the products array using the Fisher-Yates algorithm
        for (let i = productsToDisplay.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [productsToDisplay[i], productsToDisplay[j]] = [productsToDisplay[j], productsToDisplay[i]];
        }
        setProducts(productsToDisplay);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    // Call the fetch function
    fetchData();
  }, []); // The empty dependency array [] ensures this effect runs only once when the component mounts.

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Render the fetched data
  return (
    <>
        <div className="Product-container">
      <h1 className="product-title">All Products</h1>
      <div className="pro-section">
       {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card">
             <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <img src={product.images[0]} alt={product.title} className="product-image" />
              </Link>
              <h4 className="product-name">{product.title}</h4>
              <div className="product-details">
                 <p className="product-price">${product.price}</p>
                 <button className="add-to-cart-button" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
              </div> 
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
    </>
  );
}
export default  ProductsSection;