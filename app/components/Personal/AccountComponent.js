import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'

import '../Appointment/appointment.scss'
import './personal.scss'

class Index extends React.Component {
  render() {
    return (
      <div>
        <List>
          <div className='mylist'>
            <div className='list__main'>
              <div className='list__content user__desc'>
                <p className='name'>石菁</p>
                <p>身份证号：1234567887654321</p>
                <p>联系电话：12334545</p>
              </div>
            </div>
            <div className='list__left'>
              <div className='doctor__avatar'>
                <img src='https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png' />
              </div>
            </div>
          </div>
        </List>
        <WhiteSpace />
        <List>
          <div>
            123
          </div>
        </List>
      </div>
    )
  }
}

export default Index
