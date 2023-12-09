import './App.css';
import Login from './components/account/login';
import {Layout } from 'antd';
import Header from './components/misc/header';
import Footer  from './components/misc/footer';
import Navigation from './components/router';

function App() {
  return (
    <div className="App">
      <Layout  className='layout' style={{backgroundColor: 'white'}}>
        <Header />
        <Navigation />
      {/* <Login /> */}
      {/* <Activity title="Activity"/> */}
      {/* <Friends title="Friends"/> */}
      <Footer />
      </Layout>
    </div>
  );
}

export default App;
