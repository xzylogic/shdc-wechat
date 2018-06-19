import React from 'react'
import { WhiteSpace } from 'antd-mobile'

import { Tabs, Tab } from '../Common/Tabs'
import AppointmentList from './AppointmentList'
import DoctorDetail from './DoctorDetail'

import './appointment.scss'

class Index extends React.Component {
  render() {
    return (
      <div>
        <DoctorDetail />
        <WhiteSpace size='lg' />
        <Tabs contentClass='tabs__content-common' titlesClass='tabs__titles-common'>
          <Tab title='12月18日（周三）'><AppointmentList /></Tab>
          <Tab title='12月18日（周三）'><AppointmentList /></Tab>
          <Tab title='12月18日（周三）'><AppointmentList /></Tab>
          <Tab title='12月18日（周三）'><AppointmentList /></Tab>
          <Tab title='12月18日（周三）'><AppointmentList /></Tab>
          <Tab title='12月18日（周三）'><AppointmentList /></Tab>
        </Tabs>
      </div>
    )
  }
}

export default Index
