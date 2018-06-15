import React from 'react'

import { Tabs, Tab } from '../Common/Tabs'
import DoctorList from './DoctorList'

class Index extends React.Component {
  render() {
    return (
      <div>
        <Tabs contentClass='tabs__content-common' titlesClass='tabs__titles-common'>
          <Tab title='12月18日（周三）'><DoctorList /></Tab>
          <Tab title='12月18日（周三）'><DoctorList /></Tab>
          <Tab title='12月18日（周三）'><DoctorList /></Tab>
          <Tab title='12月18日（周三）'><DoctorList /></Tab>
          <Tab title='12月18日（周三）'><DoctorList /></Tab>
          <Tab title='12月18日（周三）'><DoctorList /></Tab>
        </Tabs>
      </div>
    )
  }
}

export default Index
