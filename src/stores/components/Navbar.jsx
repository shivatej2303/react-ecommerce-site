import React, { useState } from "react";
import logoImg from '../../assets/AURA-logo.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowCart } from "../../redux/cartSlice";
import './Navbar.css'

import CartItem from "./Cart";
import { Signup } from "../../signup/Signup";
import { Login } from "../../signup/Login";


const Navbar = () => {
    // useDispatch hook to send actions to the Redux store.
    const dispatch = useDispatch();
    // useSelector hook to get cart visibility state and total quantity from the Redux store.
    const { showCart, totalQuantity } = useSelector((state) => state.cart);
    // useState hooks to manage the visibility of the Signup and Login modals.
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    // This function handles the logic to switch from the Signup modal to the Login modal.
    const handleSwitchToLogin = () => {
        setShowSignup(false); // Close Signup modal
        setShowLogin(true);    // Open Login modal
    };

    return(
        <div className="header-wrapper">
            {/* Main navbar container */}
            <div className="navbar">
                <div className="logo-container-wrapper">
                    <div className="logo-container">
                        <img src={logoImg} alt="AURA brand logo" className="logo-image" />
                        <h2 className="logo">AURA</h2>
                    </div>
                    <p className="tagline">Where your aesthetic comes true</p>
                </div>
    
                <div className="search">
                    <input type="text" className="search-input" placeholder="Search Aura.in" />
                </div>
    
                {/* Signup button that opens the Signup modal */}
                <div className="signup-button">
                    <button className="signup-btn" onClick={() => setShowSignup(true)}>Signup</button>
                </div>

                {/* Cart button that shows the cart modal. It also displays the total quantity if > 0. */}
                <button className="Cart-btn" onClick={() => dispatch(setShowCart())}>
                    Cart {totalQuantity > 0 && `(${totalQuantity})`}
                </button>
                {/* Conditionally render the Cart, Signup, and Login modals based on their state. */}
                {showCart && <CartItem />}
                {showSignup && <Signup onClose={() => setShowSignup(false)} onSwitchToLogin={handleSwitchToLogin} />}
                {showLogin && <Login onClose={() => setShowLogin(false)} />}
    
            </div>
            {/* Secondary navigation bar for product categories */}
            <div className="nav-links">
                <ul className="nav-items">

                    <li>
                      <Link to={'/'}>Home</Link>
                    </li>

                    <li>
                      <Link to='/clothes'>Clothes</Link>
                    </li>

                    <li>
                      <Link to= '/electronics'>Electronics</Link>
                    </li>

                    <li>
                      <Link to = '/furniture'>Furniture</Link>
                    </li>

                    <li>
                      <Link to = '/shoes'>Shoes</Link>
                    </li>

                    <li>
                      <Link to = '/miscellaneous'>Miscellaneous</Link>
                    </li>

                </ul>
            </div>
        </div>
    );
}
export default Navbar;