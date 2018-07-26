import React from 'react'
import { connect } from 'react-redux'

import { Tabs, Tab } from '../Common/Tabs'
import DoctorListByDate from './DoctorListByDate'

class Index extends React.Component {
  render() {
    const { doctorsReducer } = this.props
    const { doctorsByDate } = doctorsReducer
    return (
      <div>
        <Tabs 
          containerClass='tabs__container-common' 
          contentClass='tabs__content-common' 
          titlesClass='tabs__titles-common'
          contentStyle={{height: 'calc(100vh - 178px)'}}>
          {
            doctorsByDate && Array.isArray(doctorsByDate) && doctorsByDate.map((data, index) =>
              <Tab key={index} title={`${data.date}（${data.weekDays}）`}>
                <DoctorListByDate doctors={data.doctors} index={index} />
              </Tab>
            )
          }
        </Tabs>
      </div>
    )
  }
}

export default connect(state => state)(Index)
