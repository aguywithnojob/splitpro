import React from 'react'
import { Avatar, Card } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
const data = [
    {
      userName: `Badal`,
      email: "badal@gmail.com",
      mobile: "1234567890"
    }
  ];

  function Account(props) {
  return (
    <Container >
        <Row>
            <h3>{props.title}</h3>
        </Row>
        <Row className='d-flex justify-content-center my-3'>
            <Card title={data[0].userName} bordered={false} style={{ width: 500}}>
                <Row>
                    <Col>
                        <Avatar style={{width: '100px', height: '100px'}} src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`} />
                    </Col>
                    <Col>
                        Email: <h4 className='pruple-clr'>{data[0].email}</h4>
                        Mobile: <h5 style={{color:'grey'}}>{data[0].mobile}</h5>
                    </Col>
                </Row>
                
            </Card>
        </Row>
       
        <Row>
            {/* logout */}
        </Row>  
    </Container>
  )
}

export default Account
