import React from 'react'
import { connect } from 'react-redux'
import { WhiteSpace } from 'antd-mobile'

import { Tabs, Tab } from '../Common/Tabs'
import AppointmentList from './AppointmentList'
import DoctorDetail from './DoctorDetail'
import { checkNullArr } from '../../utilities/common'
import { loadDoctorScheduleAction } from '../../store/actions/appointment/doctor.action'

import './appointment.scss'

class Index extends React.Component {
  loadSchedules = (id, j, k) => {
    const store = this.props
    store.dispatch(loadDoctorScheduleAction(id, j, k))
  }
  getSchedules = (list) => {
    return list && Array.isArray(list) && !checkNullArr(list) && list.reduce((objOld, obj) => 
      `${objOld.date && `${objOld.date}（${objOld.weekDays}）` || objOld} ${obj.date}（${obj.weekDays}）`
    ) || ''
  }

  render() {
    const { doctorReducer } = this.props
    const { doctorDetail, appointmentList } = doctorReducer
    return (
      <div>
        <DoctorDetail doctor={doctorDetail} schedules={this.getSchedules(appointmentList)} />
        <WhiteSpace size='lg' />
        {
          appointmentList && Array.isArray(appointmentList) && (
            <Tabs contentClass='tabs__content-common' titlesClass='tabs__titles-common'>
              {
                appointmentList.map((data, index) => (
                  <Tab key={index} title={`${data.date}（${data.weekDays}）`}>
                    <AppointmentList appointments={data.doctors} j={index} loadSchedules={this.loadSchedules}/>
                  </Tab>
                ))
              }
            </Tabs>
          )
        }
      </div>
    )
  }
}

export default connect(state => state)(Index)
