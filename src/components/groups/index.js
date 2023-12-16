import React, { useEffect, useState } from 'react'
import { BiSolidGroup } from "react-icons/bi";
import { Avatar, List } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { fetchGroups } from '../service/account-service';
import Loader from '../misc/loader';
import NoData from '../misc/nodata';
import { Link } from 'react-router-dom';


function Groups(props) {
  const [data, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [nodata, setNodata] = useState(false);
  // call fetch group api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGroups(props.userId);
        
        if (data){
          setUserData(data);
          setIsLoading(false);
        }
        else{
          // throw new Error('Fetching account details failed');
          setNodata(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Fetching account details failed:', error);
          setNodata(true);
          setIsLoading(false);
      }
    };
    fetchData();
  }, []);

    

  return (
    isLoading ? <Loader /> 
    : 
      nodata ? <NoData /> :
          <Container>
              <Row>
                  <h3>{props.title}</h3>
              </Row>
              <Row>
                  <div className="d-flex justify-content-end">
                      <h6>Overall, you are owed <span className='green-clr'>INR 10,000</span></h6>
                  </div>
              </Row>
              <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <Link to={{ pathname: `/groups/${item.id}`, state: item.name }}>
                      <List.Item key={item.id}>
                          <List.Item.Meta key={item.id}
                          avatar={<Avatar shape="square" className="group-avatar" style={{width: '80px', height: '80px'}} icon={<BiSolidGroup style={{fontSize: '70px'}} />} />}
                          title={<span style={{fontSize: '20px'}}>{item.name}</span>}
                          description = {
                                item.customers.map((friend, pos) => (
                                  <div className='d-flex flex-column justify-content-end'>
                                    {/* <h6 key={pos}>{friend} owes INR {item.settlementAmount[pos]}</h6> */}
                                    <h6 key={pos}>{friend} owes INR</h6>
                                  </div>
                                ))                        
                          }
                          />
                          
                      </List.Item>
                    </Link>
                  )}
              /> 
              {/* <Row>
                  <AddGroup />
              </Row>   */}
          </Container>
  )
}

export default Groups
