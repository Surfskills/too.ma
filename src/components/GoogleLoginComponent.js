import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import styles from './GoogleLoginComponent.module.css';

const GoogleLoginComponent = ({ onLoginSuccess }) => {
  console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const res = await axios.post('https://tooma-backend.onrender.com/social_auth/google/', { auth_token: token });
      const jwtToken = res.data.tokens.access;
      localStorage.setItem('jwtToken', jwtToken);
      onLoginSuccess();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLoginFailure = (response) => {
    console.error('Login failed', response);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        render={({ onClick }) => (
          <button onClick={onClick} className={styles.googleSignUpButton}>
            Sign up with Google
          </button>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
