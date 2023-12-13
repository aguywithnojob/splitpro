import React from 'react'
import { Avatar, List } from 'antd';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NewExpense from '../misc/newExpense';

const data = [
    {
      userName: `Badal`,
      balance: "INR 10,000",
      type: "owes you"
    },
    {
      userName: `Tushar`,
      balance: "INR 10,000",
      type: "you owe"
    },
    {
      userName: `Kartikey`,
      balance: "INR 10,000",
      type:"you owe"
    },
  ];

  function Friends(props) {
    const SettleAmount = (user, amount) => {
      console.log('called settled', user,amount)
        for(let i=0; i<data.length; i++){
            if(data[i].userName === user){
                data[i].balance = ""
                data[i].type = "Settled"
            }
        }
    }
  return (
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
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar style={{width: '50px', height: '50px'}} src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                title={<span style={{fontSize: '16px'}}>{item.userName}</span>}
                // description = {<span style={{color: 'green'}}>{item.content}</span>}
                />
                <div >
                        {
                        item.type === "you owe" ?(
                            <>
                              <span className='orange-clr' >{item.type}</span>
                              <p className='orange-clr' >{item.balance}</p> 
                              <button className='btn-orange-clr btn' onClick={()=>SettleAmount(item.userName, item.balance)} >Settle</button>
                            </>
                          ) : (
                              <>
                                <span className='green-clr' >{item.type}</span> 
                                <p className='green-clr' >{item.balance}</p>
                              </>
                          )
                        }
                    
                </div>
            </List.Item>
            )}
        /> 
        <Row>
            <NewExpense />
        </Row>  
    </Container>
  )
}

export default Friends
