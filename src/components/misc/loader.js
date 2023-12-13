import React from 'react';
import { Flex, Spin } from 'antd';
const Loader = () => (
    <div className='d-flex justify-content-center vertically-align-center' style={{marginTop:'33vh'}}>
            <Spin size="large" />
    </div>
);
export default Loader;