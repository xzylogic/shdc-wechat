import React from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'

import { Tabs, Tab } from '../Common/Tabs'
import { NullImageContent } from '../Common/Null'
import { checkNotNullArr, calcDistance } from '../../utilities/common'
import AppointmentList from './AppointmentList'
import { loadConsultationScheduleAction } from '../../store/actions/appointment/consultation.action'

import './appointment.scss'

moment.locale('zh-CN',{
  weekdays : "周日_周一_周二_周三_周四_周五_周六".split("_"),
})

class Index extends React.Component {
  loadSchedules = (j, k, id) => {
    const store = this.props
    store.dispatch(loadConsultationScheduleAction(id, j, k))
  }

  render() {
    const { consultationReducer } = this.props
    const { consultationList, deptName, pageType } =  consultationReducer
    return (
      <React.Fragment>
        <h2 style={{textAlign: 'center', fontSize: '16px', padding: '15px', background: '#fff', color: '#666'}}>{deptName}</h2>
        {
          checkNotNullArr(consultationList) ? (
            <Tabs style={{minHeight: 'calc(100vh - 48px)'}} containerClass='tabs__container-common' contentClass='tabs__content-common' titlesClass='tabs__titles-common'>
              {
                consultationList.map((data, j) => {
                  return (
                    <Tab title={moment(data.date).format('MM月DD日 （dddd）')} key={j}>
                      <AppointmentList type={pageType == 2 ? 'doctName' : 'deptName'} appointments={data.doctors} loadSchedules={this.loadSchedules.bind(this, j)} />
                    </Tab>
                  )
                })
              }
            </Tabs>
          ) : (
            <div style={{height: 'calc(100vh - 100px)'}}>
              <div className='content-center'>
                <NullImageContent msg='暂无门诊预约信息' image='/static/images/icon-null-doctor.png' />
              </div>
            </div>
          )
        }
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)
