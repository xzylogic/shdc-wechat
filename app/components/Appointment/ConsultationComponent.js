import React from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'

import { Tabs, Tab } from '../Common/Tabs'
import AppointmentList from './AppointmentList'

import './appointment.scss'

moment.locale('zh-CN',{
  weekdays : "周日_周一_周二_周三_周四_周五_周六".split("_"),
});

class Index extends React.Component {
  render() {
    const { consultationReducer } = this.props
    const { consultationList } =  consultationReducer
    return (
      <div>
        {/* <div className='consultation__title'>呼吸科</div> */}
        <Tabs contentClass='tabs__content-common' titlesClass='tabs__titles-common'>
          {
            Array.isArray(consultationList) && consultationList.map((data,index) => {
              return (
                <Tab title={moment(data.date).format('MM月DD日 （dddd）')} key={index}>
                  <AppointmentList appointments={data.doctors} />
                </Tab>
              )
            })
          }
        </Tabs>
      </div>
    )
  }
}

export default connect(state => state)(Index)
