import React, { useEffect, useState } from 'react'
import { BiSolidGroup } from "react-icons/bi";
import { Avatar, List } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Loader from '../misc/loader';
import NoData from '../misc/nodata';
import { Link } from 'react-router-dom';
import { fetchGroups } from '../service/account-service';
import {overallBalance} from '../service/overallbalance-service';


function Groups(props) {
  const [data, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [nodata, setNodata] = useState(false);
  const [balance, setBalance] = useState();
  // call fetch group api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGroups(props.userId);
        const response = await overallBalance();
        setBalance(response.overall_balance);
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
                      {(balance > 0) ? <h6>Overall, you are owed <span className='green-clr'>&#8377;{balance}</span></h6> :
                        (balance < 0) ? <h6>Overall, you owe <span className='orange-clr'>&#8377;{(balance) * -1}</span></h6>:
                        <h6>All settled</h6>
                      }
                  </div>
              </Row>
              <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <Link to={{pathname: `/groups/${item.id}`}} state= {{'name':item.name,'user_debts':item.user_debts}} >
                      <List.Item key={item.id}>
                          <List.Item.Meta key={item.id}
                          avatar={<Avatar shape="square" className="group-avatar" style={{width: '80px', height: '80px'}} icon={<BiSolidGroup style={{fontSize: '70px'}} />} />}
                          title={<span style={{fontSize: '20px'}}>{item.name}</span>}
                          description = {<>
                                { (item.user_debts < 0) ?<h6 className='orange-clr'>You will pay <span >&#8377;{(item.user_debts) * -1}</span></h6> : (item.user_debts)>0 ? <h6 className='green-clr'>You will get <span>&#8377;{(item.user_debts)}</span></h6> : <></>}
                                {item.friends_debts.map((debt, pos) => (
                                  <div className='d-flex flex-column justify-content-end'>
                                   { (debt[0].paid_by.id == props.userId ) ? <span key={pos} > You will pay {debt[1].paid_to.name} <span className='orange-clr'>&#8377;{debt[2]} </span> </span> : <></> }
                                   { (debt[1].paid_to.id == props.userId ) ? <span key={pos}> {debt[0].paid_by.name} will pay you <span className='green-clr'>&#8377;{debt[2]} </span></span> : <></> }
                                   {/* { (props.userId != debt[0].paid_by.id && props.userId == debt[1].paid_to.id) ? <h6 key={pos}>{debt[0].paid_by.name} will pay you &#8377;{debt[2]}</h6> : <></> } */}
                                  </div>
                                ))}                        
                                </>}
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
