import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  return (
    <div className="google-login-container">
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log('Login Success:', credentialResponse);
          if (onSuccess) onSuccess(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
          if (onError) onError();
        }}
      />
    </div>
  );
};

export default GoogleLoginButton;
