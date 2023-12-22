import {baseUrl} from './config'
import axios from 'axios';
axios.defaults.withCredentials = true;

export async function overallBalance(group_id="") {
  try {
        const response = await axios.get(`${baseUrl}/overallbalance/${group_id}`, { headers: {
          'Content-Type': 'application/json',
        }, });
        if (response?.status === 200) {
          return response?.data
        }
        else{
          return false
        }
    } catch (error) {
        console.error('Fetching account details failed:', error);
        return false
  }
}