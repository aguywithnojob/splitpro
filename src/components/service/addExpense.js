import {baseUrl} from './config'
import axios from 'axios';
axios.defaults.withCredentials = true;

export async function addNewExpense(data) {
  try {
        const response = await axios.post(`${baseUrl}/addexpense/`, data, { headers: {
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

export async function getExpenseDetails(expenseId) {
  try {
        const response = await axios.get(`${baseUrl}/expense/${expenseId}`,{ headers: {
          'Content-Type': 'x-www-form-urlencoded',
        }, });
        if (response?.status === 200) {
          return response?.data
        }
        else{
          return false
        }
    } catch (error) {
        console.error('Fetching expense details failed:', error);
        return false
  }
}

export async function updateExpense(expenseId, data) {
  try {
        const response = await axios.put(`${baseUrl}/expense/${expenseId}`, data, { headers: {
          'Content-Type': 'application/json',
        }, });
        if (response?.status === 200) {
          return response?.data
        }
        else{
          return false
        }
    } catch (error) {
        console.error('updating expense details failed:', error);
        return false
  }
}