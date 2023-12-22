import React,{ useEffect, useState }  from 'react'
import { Avatar, List } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NewExpense from '../misc/newExpense';
import { fetchFriends } from '../service/account-service';
import Loader from '../misc/loader';
import NoData from '../misc/nodata';
import {fetchGroupOptions} from '../service/meta-options';
import {overallBalance} from '../service/overallbalance-service';

function Friends(props) {
  const [data, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [nodata, setNodata] = useState(false);
  const [Groupoptions, setGroupoptions] = useState([]);
  const [balance, setBalance] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFriends();
        console.log('datat friend',data)
        const Groupdata = await fetchGroupOptions(props.userId)
        setGroupoptions(Groupdata)
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

  const SettleAmount = (user, amount) => {
    console.log(user, amount)
      // for(let i=0; i<data.length; i++){
      //     if(data[i].userName === user){
      //         data[i].balance = ""
      //         data[i].type = "Settled"
      //     }
      // }
  }
  return (
    isLoading ? <Loader /> 
    : 
      nodata ? 
          <>
            <NoData /> 
            <Row className='my-4' style={{zIndex: '2000000', position:'fixed', right:'230px', bottom: '80px'}}>
                <NewExpense screen="Friends" userId={props.userId} Groupoptions={Groupoptions}  />
            </Row>
          </>
      :
    <Container>
        <Row>
            <h3>{props.title}</h3>
        </Row>
        <Row>
            <div className="d-flex justify-content-end">
                {(balance > 0) ? <h6>Overall, you are owed <span className='green-clr'>&#8377;{balance}</span></h6> :
                  (balance < 0) ? <h6>Overall, you owe <span className='orange-clr'>&#8377;{(balance) * -1}</span></h6>:<></>
                }
            </div>
        </Row>
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar style={{width: '50px', height: '50px'}} src={item.avatar} />}
                title={<span style={{fontSize: '16px'}}>{item.name[0].toUpperCase()+item.name.slice(1)}</span>}
                // description = {<span style={{color: 'green'}}>{item.content}</span>}
                />
                <div style={{width:'10%'}}>
                      {
                      (item.balance < 0) ?(
                          <div className='d-flex flex-column align-items-end'>
                            <div className=''>
                              <span className='orange-clr' >You pay</span>
                              <p className='orange-clr' >&#8377;{item.balance * -1}</p> 
                            </div>
                            <button className='btn-orange-clr' style={{'border': 'none','height': '10%','alignSelf': 'end'}} onClick={()=>SettleAmount(item.name, item.balance)} >Settle</button>
                          </div>
                        ) 
                        : (item.balance > 0) ?
                        
                        (
                          <div className='d-flex flex-column align-items-end'>
                              <span className='green-clr' >You get</span> 
                              <span className='green-clr' >&#8377;{item.balance}</span>
                            </div>
                        ) :(
                            <div className='d-flex justify-content-end'>
                              <span style={{color: 'grey'}}>Settled</span> 
                              {/* <p className='green-clr' >{item.balance}</p> */}
                            </div>
                        )
                      }
                  
                </div>
            </List.Item>
            )}
        /> 
        <Row className='my-4' style={{zIndex: '2000000', position:'fixed', right:'230px', bottom: '80px'}}>
            <NewExpense screen="Friends" userId={props.userId} Groupoptions={Groupoptions}  />
        </Row> 
    </Container>
  )
}

export default Friends
