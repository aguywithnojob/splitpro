import { fetchGroups, fetchFriendsByGroup, fetchFriendsByUser } from '../service/account-service';

// fetch group options for dropdown based on logged in user_id (all group for the current user_id)
export const fetchGroupOptions = async (userId) => {
    let Groupoptions = [];
    try {
      const data = await fetchGroups(userId);
      if (data){
        for (var i = 0; i < data.length; i++)
        {
            Groupoptions.push({
            label: data[i].name,
            value: data[i].id
            })
        }
      }
      
    } catch (error) {
      console.error('fetchGroupOptions failed:', error);
    }
    return Groupoptions
  };

// fetch user options for dropdown based on group_id (all user for the current group_id or group_id is undefined fetch all group for current user_id) 
export const fetchUserOptions = async (groupId) => {
    let group_id = groupId
    let data = undefined
    try {
      data = await fetchFriendsByUser(groupId);
      if (data === undefined){
        throw new Error('Unable to fetch friends list');
      }
    } catch (error) {
      console.error('fetchUserOptions failed:', error);
    }
    return data
  };