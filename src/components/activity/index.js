import React, { useEffect, useState } from 'react'
import { Avatar, List, Divider, Skeleton  } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NewExpense from '../misc/newExpense';
import InfiniteScroll from 'react-infinite-scroll-component';

const dataList = [
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owes INR 10,000"

    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },
    {
      title: `Badal added "Grocery" in "Group"`,
      content: "You owe INR 10,000"
    },

  ];

  function Activity(props) {
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    // sleep for 10 sec
    setTimeout(() => {
      setData(dataList);
      setLoading(false);
    }, 10);
  }
  
  useEffect(() => {
    loadMoreData();
  }, []);
  
  return (
    <Container>
        <Row>
            <h3>{props.title}</h3>
        </Row>
        <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 10}
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
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={item.title}
                    description = {<span style={{color: 'green'}}>{item.content}</span>}
                    />
                    <span className='orange-clr'>6 Nov, 6:30 PM</span>
                </List.Item>
                )}
            /> 
        </InfiniteScroll>
        <Row className='my-4' style={{zIndex: '2000000', position:'fixed', right:'230px', bottom: '80px'}}>
            <NewExpense />
        </Row>  
    </Container>
  )
}

export default Activity
