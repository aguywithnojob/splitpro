import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Activity from '../activity';
import Friends from '../friends';
import Groups  from '../groups';
import Account from '../account';

function Navigation() {
  return (
          <Routes>
            <Route path="/activity" element={<Activity title="Activity"/>} >
            </Route>
            <Route path="/friends" element={<Friends title="Friends"/>}>
            </Route>
            <Route path="/groups" element={<Groups />}>
            </Route>
            <Route path="/account" element={<Account title="Account" />}>
            </Route>
        </Routes>
  )
}

export default Navigation
