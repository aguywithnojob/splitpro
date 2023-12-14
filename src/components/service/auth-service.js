import {baseUrl} from './config'
import axios from 'axios';

axios.defaults.withCredentials = true;
// post request for login using axios
export async function login(email, password) {
    try {
        const response = await axios.post(`${baseUrl}/login/`, {
            email: email,
            password: password
        }, { headers: {
            'Content-Type': 'application/json',
          }, });
        if (response?.status === 200) {
            return response?.data;
        }
        else{
            return response?.data
        }
    } catch (error) {
        console.error('Login failed:', error?.response?.data);
        return error?.response?.data
    }
}

// axios api call for logout
export async function logout() {
    try {
        const response = await axios.get(`${baseUrl}/logout/`,{ headers: {
            'Content-Type': 'x-www-form-urlencoded',
          }, });
        if (response?.status == 200) {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            window.location.reload();
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error('Logout request failed:', error);
        return false
    }
}


