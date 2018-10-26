import React from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'

import { NullImageContent } from '../../Common/Null'
import SchedulesList from '../SchedulesList/SchedulesList'
import { Tabs, Tab } from '../../UI/Tabs/Tabs'
import { checkNotNullArr } from '../../../utilities/common'
import { loadConsultationScheduleAction } from '../../../store/actions/appointment/consultation.action'

import classes from './ConsultationComponent.scss'

moment.locale('zh-CN',{
  weekdays : "周日_周一_周二_周三_周四_周五_周六".split("_"),
})

class Index extends React.Component {

  handleLoadSchedules = (j, k, id) => {
    this.props.onLoadConsultationSchedule(id, j, k)
  }

  render() {
    let consulationList = ''
    if (checkNotNullArr(this.props.consultationList)) {
      const consulation = this.props.consultationList.map((data, j) => {
        return (
          <Tab title={moment(data.date).format('MM月DD日 （dddd）')} key={j}>
            <SchedulesList
              type={this.props.pageType == 2 ? 'doctName' : 'deptName'}
              schedules={data.doctors} 
              onClick={(event, k, id) => this.handleLoadSchedules(j, k, id)} />
          </Tab>
        )
      })
      consulationList = (
        <Tabs containerStyle={{borderTop: '1px solid #eee'}}>{consulation}</Tabs>
      )
    } else {
      consulationList = (
        <div className={classes.CenterContainer}>
          <div className={classes.CenterContent}>
            <NullImageContent msg='暂无门诊预约信息' image='/static/images/icon-null-doctor.png' />
          </div>
        </div>
      )
    }
    return (
      <React.Fragment>
        <h2 className={classes.ConsulationInfo}>{this.props.deptName}</h2>
        {consulationList}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    consultationList: state.consultationReducer.consultationList,
    deptName: state.consultationReducer.deptName,
    pageType: state.consultationReducer.pageType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadConsultationSchedule: (id, j, k) => dispatch(loadConsultationScheduleAction(id, j, k)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
