import React, {useState, useEffect} from 'react';
import { Button, Modal, InputNumber, Form, Input, Select, FloatButton } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";
import {fetchUserOptions} from '../service/meta-options';
import { addNewExpense } from '../service/addExpense';

const onChange = (value) => {
  
  
};

const handleChange = (value) => {
  
};


 function NewExpense(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [size, setSize] = useState('middle');
    const Groupoptions = props.Groupoptions;
    const [Useroptions, setUseroptions] = useState([]);
    const [form] = Form.useForm();
    const [initalSplitOn, setInitalSplitOn] = useState([]);
    const onFinish = (values) => {
      if (values.Amount > 10000){
        let proceed = window.confirm('Are you sure you want to add INR '+values.Amount);
        if (!proceed){
          return
        }
      }
      

      let api_call_status = false
      const callAddExpense = async () => {
        return await addNewExpense(values)
        
      }
      // hitting the api to add new expense
      api_call_status = callAddExpense(values)
      
      if (api_call_status){
        form.resetFields()
        handleCancel();
        console.log("Expense added successfully")
        // update activityState
      }
      else{
        console.log("Something went wrong while adding expense")
      }
    };
    
    const onFinishFailed = (errorInfo) => {
      
    };
    const showModal = () => {
      setIsModalOpen(true);
    };
   
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleGroupChange = async (value) => {
      // userOptions filled based on groupId
      setUseroptions(await fetchUserOptions(value))
    };
    const PopuplateUserOptions = async (grouId) => {
      // userOptions filled based on groupId
      setUseroptions(await fetchUserOptions(grouId))
    };
    useEffect(() => {    
      // fetch group activity
      if (props.groupId){
        PopuplateUserOptions(props.groupId)
      }
      else{
        PopuplateUserOptions(Groupoptions[0].value)
      }
    }, []);

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
                  rules={[
                          { 
                            required: true, message: 'Enter Amount' 
                          },
                          {
                            validator: (_, value) => {
                              if (value < 0) {
                                return Promise.reject(new Error('Amount cannot be negative'));
                              }
                              return Promise.resolve();
                            },
                          }
                        ]}
                  
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
                  { (props.screen == "Friends" ||props.screen == "Activity") ? 
                    <Col>
                        <Form.Item
                          label="Group"
                          name="Group"
                          initialValue={Groupoptions ? Groupoptions[0].value : null}
                        >
                          <Select
                              size={size}
                              onChange={handleGroupChange}
                              style={{
                                width: '100%',
                              }}
                              options={Groupoptions}
                            />
                        </Form.Item>
                      </Col> : <></>
                  }
                  <Col>
                    <Form.Item
                      label="Paid By"
                      name="PaidBy"
                      initialValue={initalSplitOn}
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
                      // initialValue={Useroptions.length > 0 ? Useroptions[0].value : null}
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