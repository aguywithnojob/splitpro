import {baseUrl} from './config'
import axios from 'axios';
axios.defaults.withCredentials = true;

export async function fetchAccountDetail(userId) {
  try {
        const response = await axios.get(`${baseUrl}/users/${userId}`, { headers: {
          'Content-Type': 'x-www-form-urlencoded',
        }, });
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

export async function fetchGroups(userId) {
  try {
        const response = await axios.get(`${baseUrl}/groups/${userId}`, { headers: {
          'Content-Type': 'x-www-form-urlencoded',
        }, });
        if (response?.status === 200) {
          return response?.data
        }
        else{
          return []
        }
    } catch (error) {
        console.error('Fetching account details failed:', error);
  }
}

// expense of for a user in activity tab
export async function fetchActivity() {
  try {
        const response = await axios.get(`${baseUrl}/activity/`, { headers: {
          'Content-Type': 'x-www-form-urlencoded',
        }, });
        if (response?.status === 200) {
          return response?.data
        }
        else{
          return []
        }
    } catch (error) {
        console.error('Fetching account details failed:', error);
  }
}

// expense of specific group
export async function fetchGroupActivity(group_id) {
  try {
        const response = await axios.get(`${baseUrl}/activity/${group_id}`, { headers: {
          'Content-Type': 'x-www-form-urlencoded',
        }, });
        if (response?.status === 200) {
          return response?.data
        }
        else{
          return []
        }
    } catch (error) {
        console.error('Fetching account details failed:', error);
  }
}

export async function fetchFriendsByGroup(groupId) {
  try {
        const response = await axios.get(`${baseUrl}/friends/group/${groupId}`, { headers: {
          'Content-Type': 'x-www-form-urlencoded',
        }, });
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

export async function fetchFriends() {
  try {
        const response = await axios.get(`${baseUrl}/friends/`,{ headers: {
          'Content-Type': 'x-www-form-urlencoded',
        }, });
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