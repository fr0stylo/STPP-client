import auth0 from 'auth0-js';
import EventEmitter from 'eventemitter3';
import { AUTH_CONFIG } from '../../config';
import router from '../routes';

class AuthService {

    authNotifier = new EventEmitter()

    auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid',
    })

    login = () => {
      this.auth0.authorize();
    }

    getProfile = (cb) => {
      const accessToken = this.getAccessToken();
      this.auth0.getUserInfo(accessToken, (err, profile) => {
        cb(err, profile);
      });
    }

    getAccessToken = () => {
      const accessToken = localStorage.getItem('id_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
      return accessToken;
    }


    handleAuthentication = () => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          router.replace('home');
        } else if (err) {
          router.replace('home');
          console.log(err);
          alert(`Error: ${err.error}. Check the console for further details.`);
        }
      });
    }

    setSession = (authResult) => {
      // Set the time that the access token will expire at
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime(),
      );
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      this.authNotifier.emit('authChange', { authenticated: true });
    }

    logout = () => {
      // Clear access token and ID token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      this.userProfile = null;
      this.authNotifier.emit('authChange', false);
      // navigate to the home route
      router.replace('Home');
    }

    isAuthenticated = () => {
      // Check whether the current time is past the
      // access token's expiry time
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    authenticated = this.isAuthenticated()
}

const service = new AuthService();

export default service;
