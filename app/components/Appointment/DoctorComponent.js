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
  loadSchedules = (j, k, id) => {
    const store = this.props
    store.dispatch(loadDoctorScheduleAction(id, j, k))
  }
  
  getSchedules = (list) => {
    let orderTime = ''
    if (list && Array.isArray(list) && !checkNullArr(list) && list.length !== 1) {
      orderTime = list.reduce((objOld, obj) => {
        obj.orderTime = `${objOld.orderTime || `${objOld.date}（${objOld.weekDays}）`}${obj.date}（${obj.weekDays}）`
        return obj
      }).orderTime
    } else if (list && Array.isArray(list) && !checkNullArr(list) && list.length === 1) {
      orderTime = `${list[0].date}（${list[0].weekDays}）`
    }
    return orderTime
  }

  render() {
    const { doctorReducer } = this.props
    const { doctorDetail, appointmentList } = doctorReducer
    return (
      <div>
        <DoctorDetail doctor={doctorDetail} schedules={this.getSchedules(appointmentList)} />
        <WhiteSpace size='md' />
        {
          appointmentList && Array.isArray(appointmentList) && (
            <Tabs style={{minHeight: 'inherit'}} contentClass='tabs__content-common' titlesClass='tabs__titles-common'>
              {
                appointmentList.map((data, j) => {
                  return (
                    <Tab key={j} title={`${data.date}（${data.weekDays}）`}>
                      <AppointmentList 
                        type={'deptName'}
                        appointments={data.doctors} 
                        loadSchedules={this.loadSchedules.bind(this, j)}
                      />
                    </Tab>
                  )
                }
                )
              }
            </Tabs>
          )
        }
      </div>
    )
  }
}

export default connect(state => state)(Index)
