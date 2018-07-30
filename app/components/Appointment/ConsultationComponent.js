import React from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'

import { Tabs, Tab } from '../Common/Tabs'
import { NullContent } from '../Common/Null'
import { checkNullArr } from '../../utilities/common'
import AppointmentList from './AppointmentList'
import { loadConsultationScheduleAction } from '../../store/actions/appointment/consultation.action'

import './appointment.scss'

moment.locale('zh-CN',{
  weekdays : "周日_周一_周二_周三_周四_周五_周六".split("_"),
})

class Index extends React.Component {
  loadSchedules = (id, j, k) => {
    console.log(id, j, k)
    const store = this.props
    store.dispatch(loadConsultationScheduleAction(id, j, k))
  }

  render() {
    const { consultationReducer } = this.props
    const { consultationList } =  consultationReducer
    return (
      <div>
        {
          checkNullArr(consultationList) ? <NullContent msg='暂无排班记录' /> : (
            <Tabs containerClass='tabs__container-full' contentClass='tabs__content-common' titlesClass='tabs__titles-common'>
              {
                consultationList.map((data,index) => {
                  return (
                    <Tab title={moment(data.date).format('MM月DD日 （dddd）')} key={index}>
                      <AppointmentList appointments={data.doctors} j={index} loadSchedules={this.loadSchedules} />
                    </Tab>
                  )
                })
              }
            </Tabs>
          )
        }
      </div>
    )
  }
}

export default connect(state => state)(Index)
