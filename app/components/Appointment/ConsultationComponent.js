import React from 'react'

import { Tabs, Tab } from '../Common/Tabs'
import AppointmentList from './AppointmentList'

import './appointment.scss'

class Index extends React.Component {
  render() {
    return (
      <div>
        <div className='consultation__title'>呼吸科</div>
        <Tabs contentClass='tabs__content-common' titlesClass='tabs__titles-common'>
          <Tab title='12月18日（周三）'><AppointmentList /></Tab>
          <Tab title='12月19日（周四）'><AppointmentList /></Tab>
          <Tab title='12月20日（周五）'><AppointmentList /></Tab>
          <Tab title='12月21日（周六）'><AppointmentList /></Tab>
          <Tab title='12月22日（周日）'><AppointmentList /></Tab>
          <Tab title='12月23日（周一）'><AppointmentList /></Tab>
        </Tabs>
      </div>
    )
  }
}

export default Index
