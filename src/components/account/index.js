import React, { useEffect, useState } from 'react';
import { Avatar, Card } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import { fetchAccountDetail } from '../service/account-service';
import {logout} from '../service/auth-service';
import Loader from '../misc/loader';
import NoData from '../misc/nodata';

  function Account(props) {
    const [UserData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [nodata, setNodata] = useState(false);
    // useeffect to all fetchaccountdetails
      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchAccountDetail(props.userId);
            if (data){
              setUserData(data);
              setIsLoading(false);
            }
            else{
              setNodata(true);
              setIsLoading(false);
              throw new Error('Fetching account details failed');
            }
          } catch (error) {
            console.error('Fetching account details failed:', error);
            setNodata(true);
              setIsLoading(false);
          }
        };
        fetchData();
      }, []);
      const handleLogout = async () => {
        try {
          let response = await logout();
          if (response){
            localStorage.removeItem('userEmail');
            localStorage.removeItem('user_id');
          }
          // window.location.reload();
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };
  return (
    isLoading ? <Loader /> 
    : 
      nodata ? <NoData /> :
    <Container >
        <Row>
            <h3>{props.title}</h3>
        </Row>
        <Row className='d-flex justify-content-center my-3'>
            <Card title={!UserData ? "Loading..." : UserData.name} bordered={false} style={{ width: 500}}>
                <Row>
                    <Col>
                        <Avatar style={{width: '100px', height: '100px'}} src={UserData.avatar? UserData.avatar : ""} />
                    </Col>
                    <Col>
                        Email: <h6 className='pruple-clr'>{!UserData ? "Loading..." : UserData.email}</h6>
                        Mobile: <h6 className='pruple-clr'>{!UserData ? "Loading..." : UserData.mobile}</h6>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <button className="btn btn-orange-clr" onClick={()=>handleLogout()}>Logout</button>
                    </Col>
                </Row>
            </Card>
        </Row>
       
          
    </Container>
  )
}

export default Account
