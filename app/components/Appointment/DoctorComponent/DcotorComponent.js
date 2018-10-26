import React from 'react'
import { connect } from 'react-redux'
import { WhiteSpace } from 'antd-mobile'

import DoctorDetail from './DoctorDetail/DoctorDetail'
import SchedulesList from '../SchedulesList/SchedulesList'
import { Tabs, Tab } from '../../UI/Tabs/Tabs'
import { checkNullArr, checkNotNullArr } from '../../../utilities/common'
import { loadDoctorScheduleAction } from '../../../store/actions/appointment/doctor.action'

class Index extends React.Component {
  handleScheduleClick = (event, j, k, id) => {
    this.props.onLoadDoctorSchedule(id, j, k)
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
    let doctorSchedule = ''
    if (checkNotNullArr(this.props.appointmentList)) {
      doctorSchedule = this.props.appointmentList.map((schedule, j) => {
        return (
          <Tab key={j} title={`${schedule.date}（${schedule.weekDays}）`}>
            <SchedulesList
              schedules={schedule.doctors}
              onClick={(event, k, id) => this.handleScheduleClick(event, j, k, id)} />
          </Tab>
        )
      })
    }
    return (
      <div>
        <DoctorDetail doctor={this.props.doctorDetail} schedules={this.getSchedules(this.props.appointmentList)} />
        <WhiteSpace size='md' />
        <Tabs>{doctorSchedule}</Tabs>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    doctorDetail: state.doctorReducer.doctorDetail,
    appointmentList: state.doctorReducer.appointmentList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadDoctorSchedule: (id, j, k) => dispatch(loadDoctorScheduleAction(id, j, k)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
