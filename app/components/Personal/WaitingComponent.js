import React from 'react'
import Router from 'next/router'
import { List } from 'antd-mobile'

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <List>
          <List.Item
            arrow='horizontal'
            onClick={() => Router.push('/personal/waitinghospital?pageType=1', '/personal/waitinghospital/1')}
          >
            <img src='/static/images/myqueue.png' style={{width: '50px', height: '50px', marginRight: '15px'}} />
            我的队列
          </List.Item>
          <List.Item
            arrow='horizontal'
            onClick={() => Router.push('/personal/waitinghospital?pageType=2', '/personal/waitinghospital/2')}
          >
            <img src='/static/images/icon-hosqueue.png' style={{width: '50px', height: '50px', marginRight: '15px'}} />
            医院队列
          </List.Item>
        </List>
      </React.Fragment>
    )
  }
}

export default Index
