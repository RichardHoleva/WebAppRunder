import LoginFields from "../components/LoginFields.jsx";
import '../styles/login.css';
import googleIcon from '../assets/google.png';
import facebookIcon from '../assets/facebook.png';
import appleIcon from '../assets/apple.png';

export default function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <h1>Welcome back</h1>
        <LoginFields/>

      <div className="social-login">
          <p className="social-login-label">sign in with</p>
          <div className="social-buttons">
              <img src={googleIcon} alt="Google" />
              <img src={appleIcon} alt="Apple" />
              <img src={facebookIcon} alt="Facebook" />
          </div>
        </div>
      </div>
    </div>
  );
}