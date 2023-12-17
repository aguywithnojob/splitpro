import {baseUrl} from './config'
import axios from 'axios';
axios.defaults.withCredentials = true;

export async function addNewExpense(data) {
  
  const post_data = {
      item : data.Item,
      amount : data.Amount,
      paid_by : data.PaidBy,
      group : data.Group,
      split_on : data.SplitOn
  }
  try {

        const response = await axios.post(`${baseUrl}/addexpense/`, post_data, { headers: {
          'Content-Type': 'application/json',
        }, });
        if (response?.status === 201) {
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