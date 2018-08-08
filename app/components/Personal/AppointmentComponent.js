import React from 'react'
import { connect } from 'react-redux'
import { WhiteSpace, WingBlank, Modal } from 'antd-mobile'

import { AppointmentCard } from './AppointmentCard'
import UserCard from './UserCard'
import { NullContent } from '../Common/Null'
import { checkNotNullArr } from '../../utilities/common'
import { updateAppointmentParamAction, cancelAppointmentAction } from '../../store/actions/personal/appointment.action'

import './personal.scss'

class Index extends React.Component {
  handleCancel = (obj) => {
    const store = this.props
    const postData = {
      orderId: obj.orderId,
      hosOrgCode: obj.hosOrgCode, 
      numSourceId: obj.numSourceId
    }
    Modal.alert('取消预约', '您确定取消这个预约？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => store.dispatch(cancelAppointmentAction(postData)) },
    ])
  }

  render() {
    const store = this.props
    const { appointmentList, searchParam } = store.appointmentReducer
    const filterAppointmentList = appointmentList.filter(obj => obj.mediCardId === searchParam)
    return (
      <div>
        <UserCard value={searchParam} onChange={(value)=> store.dispatch(updateAppointmentParamAction(value[0]))} />
        <div className='box'>
          <p className='animate'>温馨提示：预约时间段以短信为主，本预约时段只供参考！</p>
        </div>
        <WhiteSpace />
        {
          filterAppointmentList && checkNotNullArr(filterAppointmentList) && filterAppointmentList.map((obj,i) => {
            return (
              <WingBlank size='xs' key={i}>
                <AppointmentCard data={obj} handleCancel={this.handleCancel.bind(this, obj)}/>
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
