import './login.css'
import { useDispatch } from 'react-redux'

export const Login = ({ onClose }) =>{
    const dispatch = useDispatch();

    return(
        <>
        <div className="cart-overlay">
            <div className='form'>
                   <button className="close-btn" onClick={onClose}>&times;</button>
             <form >
                <h2>Login</h2>
                <input type="text"
                className="name"
                placeholder="Enter your MailId"
                required
                />
                <input type="password"
                className="password"
                placeholder="Enter your Password"
                required
                />
                <button className="login-btn" type="submit" onClick={()=>{dispatch(login())}}>Login</button>
                
             </form>
            </div>
          </div>
        </>
    )
}