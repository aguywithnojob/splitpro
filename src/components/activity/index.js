import React, { useEffect, useState } from 'react'
import { Avatar, List, Divider, Skeleton  } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NewExpense from '../misc/newExpense';
import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchActivity} from '../service/account-service';
import Loader from '../misc/loader';
import NoData from '../misc/nodata';
import { GiExpense } from "react-icons/gi";
import {fetchGroupOptions} from '../service/meta-options';
import {getExpenseDetails, updateExpense} from '../service/addExpense';
import {fetchUserOptions} from '../service/meta-options';

import { Button, Modal, InputNumber, Form, Input, Select } from 'antd';
import Col from 'react-bootstrap/Col';
import {notify}  from '../misc/toast';


const onChange = (value) => {
  
  
};

const handleChange = (value) => {
  
};
  function Activity(props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nodata, setNodata] = useState(false);
    const [Groupoptions, setGroupoptions] = useState([]);
    
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [size, setSize] = useState('middle');
    const [Useroptions, setUseroptions] = useState([]);
    const [initalSplitOn, setInitalSplitOn] = useState([]);
    
    const loadMoreData = () => {
      if (loading) {
        return;
      }
      setLoading(true);
      fetchData();
    }

    const fetchData = async () => {
      try {
        const data = await fetchActivity();
        const Groupdata = await fetchGroupOptions(props.userId)
        setGroupoptions(Groupdata)

        if (data){
          setData(data);
          setIsLoading(false);
          setLoading(false);
        }
        else{
          setNodata(true);
          setIsLoading(false);
          setLoading(false);
          // throw new Error('Fetching account details failed');
        }
      } catch (error) {
        console.error('Fetching account details failed:', error);
          setNodata(true);
          setIsLoading(false);
          
      }
    };

    const getPaidBy = (name) => {
      // loop over Useroptions and return object where name matches with object label
      for (let i = 0; i < Useroptions.length; i++) {
        if (Useroptions[i].label === name) {
          return Useroptions[i];
        }
      }
      return null;
     }

    
    const getSplitOn = (names) => {
      // loop over Useroptions and return object where names matches with object label
      let splitOnIds = [];

      // if all elements of names are digits in string form then return names as it is
      for (let i = 0; i < names.length; i++) {
        if (names[i].match(/^[0-9]+$/))  {
          splitOnIds.push(names[i]);
        }
      }

      for (let i = 0; i < Useroptions.length; i++) {
        for (let j = 0; j < names.length; j++) {
          if ((Useroptions[i].label === names[j]) && !splitOnIds.includes(Useroptions[i].value)) {
            splitOnIds.push(Useroptions[i].value);
          }
        }
      }
      return splitOnIds;
    }

    const onFinishFailed = (errorInfo) => {
      
    };
    const showModal = (expenseId) => {
      
      const callGetExpenseDetails = async () => {
        const expense = await getExpenseDetails(expenseId);
        const splitOn = expense.split_on.map(user => String(user.id))
        
        if (expense){
          const formExpenseData = {
            expenseId : expense.id,
            Item : expense.item,
            Amount : expense.amount,
            PaidBy : expense.paid_by.name,
            Group : expense.group.id,
            SplitOn : splitOn,
          }
          form.setFieldsValue(formExpenseData);
         
        }
       
      }
      callGetExpenseDetails();
      setIsModalOpen(true);
    };
    const onFinish = (values) => {
      console.log("onfinish invoked")
      if (values.Amount > 10000){
        let proceed = window.confirm('Are you sure you want to add &#8377;'+values.Amount);
        if (!proceed){
          return
        }
      }

      console.log(values,"<<<<<<<<<<<<<< values <<<<<<<<<<<<<")

      const post_data = {
        item : values.Item,
        amount : values.Amount,
        paid_by : values.PaidBy.match(/^[0-9]+$/) ? values.PaidBy : getPaidBy(values.PaidBy).value,
        group : values.Group,
        split_on : getSplitOn(values.SplitOn)
      }

      const expenseId = values.expenseId;

      const callUpdateExpense = async () => {
        const expense = await updateExpense(expenseId, post_data);
        if (expense){
          form.resetFields();
          setIsModalOpen(false);
          loadMoreData();
          notify("success","Expense updated successfully")
        } else {
          notify("error","Something went wrong while updating expense")
        }
      }

      callUpdateExpense();
      // console.table(post_data)
      
    };

    const handleGroupChange = async (value) => {
      // userOptions filled based on groupId
      setUseroptions(await fetchUserOptions(value))
    };

    const PopuplateUserOptions = async (grouId) => {
      // userOptions filled based on groupId
      setUseroptions(await fetchUserOptions(grouId))
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {    
      loadMoreData();
      if (Groupoptions.length > 0){
        PopuplateUserOptions(Groupoptions[0].value)
      }
      
    }, []);
    
  
  return (
    isLoading ? <Loader /> 
    : 
      nodata ? 
              <>
                <NoData /> 
                <Row className='my-4' style={{zIndex: '2000000', position:'fixed', right:'230px', bottom: '80px'}}>
                    <NewExpense 
                      screen = "Activity" 
                      userId = {props.userId} 
                      Groupoptions = {Groupoptions}
                      setData = {setData}
                      expenseData = {data}
                    />
                </Row>
              </>
      :
    <Container>
        <Row>
            <h3>{props.title}</h3>
        </Row>
        <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={loading}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                      <List.Item.Meta
                      avatar={<Avatar style={{backgroundColor: '#A6002F', height: '40px', width: '40px', alignItems: 'center'}} icon={<GiExpense style={{verticalAlign:'bottom'}} />}/>}
                      title={<span>{item.paid_by.name.toUpperCase()} added "<b>{item.item.toUpperCase()}</b>" in "<b>{item.group.name.toUpperCase()}</b>"</span>}
                      description = {<div className='d-flex flex-column'>  {item.share <0 ? <span className='orange-clr'>You will pay &#8377;{0-item.share}</span> : <span className='green-clr'>You will get &#8377;{item.share}</span>} <i className=''>{item.timestamp}</i> </div>}
                      onClick={() => showModal(item.id)}
                      />
                      <div className='d-flex flex-column align-items-end'>
                        <span className='orange-clr'>&#8377;{item.amount}</span>
                      </div>
                  </List.Item>
                )}
            /> 
        </InfiniteScroll>
        <Row className='my-4' style={{zIndex: '2000000', position:'fixed', right:'230px', bottom: '80px'}}>
            <NewExpense screen="Activity" 
                  userId={props.userId} 
                  Groupoptions={Groupoptions} 
                  updateActivity={fetchData}
                />
        </Row> 
        <Modal width={1000} title="New Expense" open={isModalOpen} onCancel={handleCancel} centered cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }}>
          <Container >
              <Form
                name="expense"
                form={form}
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
                <Form.Item
                  label="Expense Id"
                  name="expenseId"
                  style={{ display: 'none' }}
                >
                  <Input />
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
                    <Col>
                        <Form.Item
                          label="Group"
                          name="Group"
                          // initialValue={Groupoptions}
                        >
                          <Select
                              size={size}
                              onChange={handleGroupChange}
                              style={{
                                width: '100%',
                              }}
                            >
                              {Groupoptions.map((group) => (
                                <Select.Option key={group.value} value={group.value}>{group.label}</Select.Option>
                              ))}
                            </Select>

                        </Form.Item>
                      </Col> 
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
                      // initialValue={initalSplitOn}
                    >
                      <Select
                          mode="multiple"
                          size={size}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                          }}

                        >
                          {Useroptions.map((user) => (
                            <Select.Option key={user.value} value={user.value}>{user.label}</Select.Option>
                          ))}
                        </Select>
                      
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item  className='d-flex justify-content-center'>
                  <Button style={{background: '#1CC29F', color: 'white'}} type="primary" htmlType="add">
                    Update
                  </Button>
                </Form.Item>
              </Form>
          </Container>
        </Modal> 
    </Container>
  )
}

export default Activity
