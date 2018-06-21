import React from 'react'
import { WhiteSpace, WingBlank } from 'antd-mobile'

import { AppointmentCard } from './AppointmentCard'
import { UserCard } from './UserCard'

import './personal.scss'

class Index extends React.Component {

  render() {
    return (
      <div>
        <UserCard />
        <WhiteSpace />
        <WingBlank size='xs'>
          <AppointmentCard />
        </WingBlank>
        <WhiteSpace />
        <WingBlank size='xs'>
          <AppointmentCard />
        </WingBlank>
        <WhiteSpace />
      </div>
    )
  }
}

export default Index
