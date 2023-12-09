import React from 'react'
import { Avatar, List } from 'antd';
import Container from 'react-bootstrap/Container';
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
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                title={<span style={{fontSize: '20px'}}>{item.userName}</span>}
                // description = {<span style={{color: 'green'}}>{item.content}</span>}
                />
                <div >
                        {
                        item.type === "you owe" ?( <><span className='orange-clr' style={{display: 'flex', justifyContent: 'flex-end'}}>{item.type}</span>  <p className='orange-clr'>{item.balance}</p></>)
                        : (<><span className='green-clr' style={{display: 'flex', justifyContent: 'flex-end'}}>{item.type}</span>  <p className='green-clr' >{item.balance}</p></>)
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
