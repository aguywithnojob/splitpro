import './App.css';
import Login from './components/account/login';
import {Layout } from 'antd';
import Header from './components/misc/header';
import Footer  from './components/misc/footer';
import Navigation from './components/router';
import {useEffect, useState} from 'react';
import ToastPopup from './components/misc/toast';

function getToken() {
  const email = localStorage.getItem('userEmail');
  const user_id =  localStorage.getItem('user_id');
  return {email,user_id};
}
function App() {
  const [token, setToken] = useState();
  const [userId,setuserId] = useState();
  
  useEffect(() => {
    const {email,user_id} = getToken();
    
    if(email && user_id){
      setToken(email);
      setuserId(user_id);
    }
  }, []);

  if(!token) {
    return <Login setToken={setToken} setuserId = {setuserId} />
  }
  return (
    <>
    <ToastPopup />
    <div className="App">
      <Layout  className='layout' style={{backgroundColor: 'white'}}>
        <Header />
        <Navigation  userId={userId}  />
      {/* <Login /> */}
      {/* <Activity title="Activity"/> */}
      {/* <Friends title="Friends"/> */}
      <Footer />
      </Layout>
    </div>
    </>
  );
}

export default App;
