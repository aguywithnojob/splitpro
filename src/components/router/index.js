import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Activity from '../activity';
import Friends from '../friends';
import Groups  from '../groups';
import Account from '../account';
import GroupExpense from '../groups/activity';
function Navigation(props) {
  return (
          <Routes>
            <Route path="/activity" element={<Activity title="Activity" userId={props.userId}/>} >
            </Route>
            <Route path="/friends" element={<Friends title="Friends" userId={props.userId} />}>
            </Route>
            <Route path="/groups" element={<Groups title="Groups" userId={props.userId}/>}>
            </Route>
            <Route path="/groups/:groupId" element={<GroupExpense userId={props.userId}/>}>
            </Route>
            <Route path="/" element={<Account title="Account" userId={props.userId} />}>
            </Route>
            
            {/* <Route path="/login" element={<Login setToken={props.setToken} setuserId = {props.setuserId}/>}>
            </Route> */}
        </Routes>
  )
}

export default Navigation
