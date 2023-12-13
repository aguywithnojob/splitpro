import {baseUrl} from './config'
import axios from 'axios';

// post request for login using axios
export async function login(email, password) {
    try {
        const response = await axios.post(`${baseUrl}/login/`, {
            email: email,
            password: password
        });
        if (response?.status === 200) {
            return response?.data;
        }
        else{
            return false
        }
    } catch (error) {
        console.error('Login failed:', error);
        return false
    }
}

// axios api call for logout
export async function logout() {
    try {
        const response = await axios.post(`${baseUrl}/logout/`, null, { withCredentials: true });
        console.log('status', response?.status);
        if (response?.status == 200) {
            sessionStorage.removeItem('userEmail');
            return true;
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Logout request failed:', error);
    }
}


