import React, {useState} from 'react';
import { Button, Modal, InputNumber, Form, Input, Select, FloatButton } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";
const onChange = (value) => {
  console.log('changed', value);
  
};

const handleChange = (value) => {
  console.log(`Selected: ${value}`);
};

const Useroptions = [
        {
          label: 'Gautam',
          value: 'Gautam',
        },
        {
          label: 'Badal',
          value: 'Badal',
        },
        {
          label: 'Shubham',
          value: 'Shubham'
        }
      ]

 function NewExpense() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [size, setSize] = useState('middle');
    
    const onFinish = (values) => {
      console.log('Success:', values);
      handleCancel();
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    const showModal = () => {
      setIsModalOpen(true);
    };
   
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
        <div className='d-flex justify-content-end'>
        <FloatButton 
          onClick={showModal} 
          shape="circle"
          icon={
            <IconContext.Provider value={{ style: { fontSize: '20px' }, className: "global-class-name" }}>
              <FaPlus />
            </IconContext.Provider>
          }
          // description="Add"
        >
          </FloatButton>
        </div>
        <Modal width={1000} title="New Expense" open={isModalOpen} onCancel={handleCancel} centered cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }}>
          <Container >
              <Form
                name="expense"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row>
                  <Col>
                <Form.Item
                  label="Item"
                  name="Item"
                  rules={[{ required: true, message: 'Enter a description' }]}
                >
                  <Input placeholder="Enter a description" />
                </Form.Item>
                </Col>
                <Col>
                <Form.Item
                  label="Amount"
                  name="Amount"
                  rules={[{ required: true, message: 'Enter Amount' }]}
                >
                  <InputNumber style={{width: '100%'}}
                    formatter={(value) => `INR ${value.replace(/\INR\s?|(,*)/g, '')}`}
                    parser={(value) => value.replace(/\INR\s?|(,*)/g, '')}
                    onChange={onChange}
                  />
                </Form.Item>
                </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Item
                      label="Paid By"
                      name="PaidBy"
                      initialValue={Useroptions[0].value}
                    >
                      <Select
                          size={size}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                          }}
                          options={Useroptions}
                        />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="Split On"
                      name="SplitOn"
                      initialValue={Useroptions[0].value}
                    >
                      <Select
                          mode="tags"
                          size={size}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                          }}
                          options={Useroptions}
                        />
                      
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item  className='d-flex justify-content-center'>
                  <Button style={{background: '#1CC29F', color: 'white'}} type="primary" htmlType="add">
                    Add
                  </Button>
                </Form.Item>
              </Form>
          </Container>
        </Modal>
      </>
    );
}

export default NewExpense