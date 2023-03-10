import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        // If token exists and not expired return true
        return token && !this.isTokenExpired(token) ? true : false;
    }

    isTokenExpired(token) {
        // Decode token to get expiration time set by the server
        const decoded = decode(token);
        // If expiration time is < current time, then it's expired so return true, if not, return false
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true;
        }
        return false;
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // To login gets token and sets in local storage, then loads homepage with auth access
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        // Removes token and loads page with unauth access
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();