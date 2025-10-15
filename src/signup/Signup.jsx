import  './Signup.css'

export const Signup = ({ onClose, onSwitchToLogin }) =>{

    return(
        <>
        <div className="cart-overlay">
            <div className="form">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <form>
                    <h2>Sign Up</h2>
                    <input type="text" 
                    className="name" 
                    placeholder="Enter Your Name" 
                    required
                    />
                    <input type="email" 
                    className="email" 
                    placeholder="Enter Your Email" 
                    required
                    />
                    <input type="password" 
                    className="password" 
                    placeholder="Enter Your Password" 
                    required
                    />
                    <input type="password" 
                    className="confirm-password" 
                    placeholder="Confirm Your Password" 
                    required
                    />
                    <button type="submit">Signup</button>
                    <p>Already having an account? <span> <button type="button" onClick={onSwitchToLogin}>Login</button></span> </p>
                </form>
            </div>
        </div>
        </>
    )
}