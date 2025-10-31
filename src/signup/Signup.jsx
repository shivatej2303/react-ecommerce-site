import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import  './Signup.css'

export const Signup = ({ onClose, onSwitchToLogin }) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { name, email, userId: 'some-unique-id' };
        dispatch(setUser(userData)); 
        navigate('/');             
        alert(`Welcome, ${name}! You are signed up.`);
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <div className="cart-overlay">
            <div className="form">
                <button className="close-btn" onClick={onClose}>&times;</button>
                    <h2>Signup</h2>
                    <input type="text" 
                    className="name" 
                    placeholder="Enter Your Name" 
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                    <input type="email" 
                    className="email" 
                    placeholder="Enter Your Email" 
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input type="password" 
                    className="password" 
                    placeholder="Enter Your Password" 
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <input type="password" 
                    className="confirm-password" 
                    placeholder="Confirm Your Password" 
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button type="submit">Signup</button>
                    <p>Already having an account? <span> <button type="button" onClick={onSwitchToLogin}>Login</button></span> </p>
            </div>
        </div>
        </form>
        </>
    )
}