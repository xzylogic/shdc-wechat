import React from 'react'

import { Flex, Button } from 'antd-mobile';

class Index extends React.Component {

  render() {
    return (
      <div>
        <div className='appointment__list'>
          <Flex align='baseline'>
            <Flex.Item>
              <div className='appointment__item'>专家门诊</div>
            </Flex.Item>
            <Flex.Item style={{flex: 2}}>
              <div className='appointment__item'>10:00 - 10:59</div>
            </Flex.Item>
            <Flex.Item>
              <div className='appointment__item'>24 元</div>
            </Flex.Item>
            <Flex.Item>
              <div className='appointment__item'>
                <Button size='small' type='primary' style={{padding: '0 5px'}}>预约</Button>
              </div>
            </Flex.Item>
          </Flex>
        </div>
        <div className='appointment__list'>
          <Flex align='baseline'>
            <Flex.Item>
              <div className='appointment__item'>专家门诊</div>
            </Flex.Item>
            <Flex.Item style={{flex: 2}}>
              <div className='appointment__item'>10:00 - 10:59</div>
            </Flex.Item>
            <Flex.Item>
              <div className='appointment__item'>24 元</div>
            </Flex.Item>
            <Flex.Item>
              <div className='appointment__item'>
                <Button size='small' type='primary' style={{padding: '0 5px'}}>预约</Button>
              </div>
            </Flex.Item>
          </Flex>
        </div>
        <div className='appointment__list'>
          <Flex align='baseline'>
            <Flex.Item>
              <div className='appointment__item'>专家门诊</div>
            </Flex.Item>
            <Flex.Item style={{flex: 2}}>
              <div className='appointment__item'>10:00 - 10:59</div>
            </Flex.Item>
            <Flex.Item>
              <div className='appointment__item'>24 元</div>
            </Flex.Item>
            <Flex.Item>
              <div className='appointment__item'>
                <Button size='small' type='primary' style={{padding: '0 5px'}}>预约</Button>
              </div>
            </Flex.Item>
          </Flex>
        </div>
      </div>
    )
  }
}

export default Index