import React from 'react'
import { connect } from 'react-redux'
import { WhiteSpace, WingBlank } from 'antd-mobile'

import { AppointmentCard } from './AppointmentCard'
import UserCard from './UserCard'
import { NullContent } from '../Common/Null'
import { checkNotNullArr } from '../../utilities/common'
import { updateAppointmentParamAction } from '../../store/actions/personal/appointment.action'

import './personal.scss'

class Index extends React.Component {

  render() {
    const store = this.props
    const { appointmentList, searchParam } = store.appointmentReducer
    const filterAppointmentList = appointmentList.filter(obj => obj.mediCardId === searchParam[0])
    return (
      <div>
        <UserCard value={searchParam} onChange={(value)=> store.dispatch(updateAppointmentParamAction(value))} />
        <WhiteSpace />
        {
          filterAppointmentList && checkNotNullArr(filterAppointmentList) && filterAppointmentList.map((obj,i) => {
            return (
              <WingBlank size='xs' key={i}>
                <AppointmentCard data={obj} />
                <WhiteSpace />
              </WingBlank>
            )
          }) || <NullContent msg='暂无预约信息' />
        }
      </div>
    )
  }
}

export default connect(state => state)(Index)
