import { fetchGroups, fetchFriendsByGroup } from '../service/account-service';

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
    let Useroptions = [];
    try {
      if (group_id === undefined || group_id === null || group_id === ''){
         group_id = groupId
      }
      const data = await fetchFriendsByGroup(group_id);
      if (data){
        for (var i = 0; i < data.length; i++)
        {
          Useroptions.push({
            label: data[i].name,
            value: data[i].id
          })
        }
      }
    } catch (error) {
      console.error('fetchUserOptions failed:', error);
    }
    return Useroptions
  };