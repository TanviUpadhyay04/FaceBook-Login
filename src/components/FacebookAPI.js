import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const FacebookAPI = ({ onLoginSuccess }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const responseFacebook = async (response) => {
    if (response.accessToken) {
      setLoggedIn(true);
      setAccessToken(response.accessToken);

      try {
        const userData = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,picture&access_token=${response.accessToken}`);
        setUserName(userData.data.name);
        setUserPicture(userData.data.picture.data.url);
        onLoginSuccess({
          name: userData.data.name,
          picture: userData.data.picture.data.url,
          accessToken: response.accessToken,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      setLoggedIn(false);
    }
  };

  return (
    <div>
      {!loggedIn ? (
        <FacebookLogin
          appId="784561720546449"
          fields="name,email,picture"
          callback={responseFacebook}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className="facebook-login-button">
              Login with Facebook
            </button>
          )}
        />
      ) : (
        <div>
          <p>Logged in as {userName}</p>
          <img src={userPicture} alt="User Profile" className="profile-picture" />
        </div>
      )}
    </div>
  );
};

export default FacebookAPI;
