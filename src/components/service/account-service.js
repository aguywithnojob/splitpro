import {baseUrl} from './config'
import axios from 'axios';

export async function fetchAccountDetail(userId) {
  try {
        const response = await axios.get(`${baseUrl}/users/${userId}`, { withCredentials: true, headers: {
          'Content-Type': 'x-www-form-urlencoded',
        }, });
        console.log('res ======>', response);
        if (response?.status === 200) {
          return response?.data
        }
        else{
          return {}
        }
    } catch (error) {
        console.error('Fetching account details failed:', error);
  }
}

