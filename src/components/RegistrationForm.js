import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import './styles.css';
import FacebookAPI from './FacebookAPI';

const RegistrationForm = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleFacebookLogin = (userData) => {
    setLoggedIn(true);
    setUserName(userData.name);
    setUserPicture(userData.picture);
    setAccessToken(userData.accessToken);
  };

  return (
    <div className="registration-container">
      <div className="registration-flexbox">
        <div className="info-section">
          {loggedIn && (
            <div className="info-content">
              <Typography variant="h6" component="div" className="quote">
                "Logged in as {userName}"
              </Typography>
              <img src={userPicture} alt="User Profile" className="profile-picture" />
            </div>
          )}
        </div>
        <div className="form-section">
          <Typography variant="h4" component="h1">
            Register Individual Account!
          </Typography>
          <Typography variant="body2" component="p" className="form-description">
            For the purpose of industry regulation, your details are required.
          </Typography>
          <form noValidate autoComplete="off" className="registration-form">
            <TextField fullWidth label="Your fullname" variant="outlined" margin="normal" required />
            <TextField fullWidth label="Email address" variant="outlined" margin="normal" required />
            <TextField fullWidth label="Create password" variant="outlined" margin="normal" type="password" required />
            <FormControlLabel control={<Checkbox name="terms" color="primary" />} label="I agree to terms & conditions" />
            <Button fullWidth variant="contained" color="primary" className="register-button">
              Register Account
            </Button>
            <Typography variant="body2" component="p" align="center" className="or-divider">
              Or
            </Typography>
            <FacebookAPI onLoginSuccess={handleFacebookLogin} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
