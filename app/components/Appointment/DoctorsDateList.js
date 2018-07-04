import React from 'react'

import { Tabs, Tab } from '../Common/Tabs'
import DoctorListByDate from './DoctorListByDate'

class Index extends React.Component {
  render() {
    return (
      <div>
        <Tabs 
          containerClass='tabs__container-common' 
          contentClass='tabs__content-common' 
          titlesClass='tabs__titles-common'
          contentStyle={{height: 'calc(100vh - 178px)'}}>
          <Tab title='12月18日（周三）'><DoctorListByDate /></Tab>
          <Tab title='12月18日（周三）'><DoctorListByDate /></Tab>
          <Tab title='12月18日（周三）'><DoctorListByDate /></Tab>
          <Tab title='12月18日（周三）'><DoctorListByDate /></Tab>
          <Tab title='12月18日（周三）'><DoctorListByDate /></Tab>
          <Tab title='12月18日（周三）'><DoctorListByDate /></Tab>
        </Tabs>
      </div>
    )
  }
}

export default Index
