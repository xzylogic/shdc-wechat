import React, { Component } from 'react'
import { connect } from 'react-redux'
 
import FlexItem from '../../../UI/FlexItem/FlexItem'
import ImageContainer from '../../../UI/ImageContainer/ImageContainer'
import { Tabs, Tab } from '../../../UI/Tabs/Tabs'
import { NullImageContent } from '../../../Common/Null'
import SchedulesList from '../../SchedulesList/SchedulesList'
import { checkNotNullArr, checkNullArr } from '../../../../utilities/common'
import { modifyDoctorsShow, loadScheduleAction } from '../../../../store/actions/appointment/doctors.action'

import classes from './DoctorsByDate.scss'

class DoctorsByDate extends Component {

  onScheduleClick = (event, i, j, k, id) => {
    this.props.onLoadSchedule(id, i, j, k)
  }

  render () {
    let doctorsContent = ''
    let defalutImgUrl = '/static/images/avatar_doctor.png'
  
    if (checkNotNullArr(this.props.doctors)) {
      const tabContent = this.props.doctors.map((obj, i) => {
        let doctorsList = ''
        if (checkNotNullArr(obj.doctors)) {
          doctorsList = obj.doctors.map((doctor, j) => {
            const imageUrl = `https://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${doctor.hosOrgCode}_${doctor.hosDoctCode}.jpg`
            let schedules = ''
            if (doctor.show) {
              schedules = <SchedulesList
                schedules={doctor.schedules}
                onClick={(event, k, id) => this.onScheduleClick(event, i, j, k, id)} />
            }
            return (
              <React.Fragment key={j}>
                <FlexItem
                  containerClass={classes.DoctorList}
                  subWidth='100px'
                  subContent={
                    <div style={{padding: '15px', height: '100px'}}>
                      <ImageContainer
                        src={imageUrl}
                        defalutImage={defalutImgUrl}
                        containerStyle={{borderRadius: '50%'}} /> 
                    </div>
                  }
                  extraWidth='0'
                  extraContent=''
                  onClick={(event) => this.props.onModifyDoctorsShow(event, i, j)}>
                  <div className={classes.DoctorInfoContent}>
                    <p className={classes.Title}>{doctor.doctName} {doctor.doctTile}</p>
                    <p className={classes.Content}>{doctor.doctInfo}</p>
                  </div>
                </FlexItem>
                {schedules}
              </React.Fragment>
            )
          })
        } else {
          doctorsList = (
            <div className={classes.CenterContent}>
              <NullImageContent msg='暂无可预约专家、医生信息' image='/static/images/icon-null-doctor.png' />
            </div>
          )
        }
        return (
          <Tab key={i} title={`${obj.date}（${obj.weekDays}）`}>
            {doctorsList}
          </Tab>
        )
      })
  
      doctorsContent = <Tabs contentStyle={{height: 'calc(100vh - 159px)'}}>{tabContent}</Tabs>
    } else {
      doctorsContent = (
        <div className={classes.CenterContent}>
          <NullImageContent msg='暂无可预约专家、医生信息' image='/static/images/icon-null-doctor.png' />
        </div>
      )
    }
  
    return (
      <React.Fragment>
        {doctorsContent}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onModifyDoctorsShow:  (event, i, j) => dispatch(modifyDoctorsShow(i, j)),
    onLoadSchedule: (id, i, j, k) => dispatch(loadScheduleAction(id, i, j, k)),
  }
}

export default connect(null, mapDispatchToProps)(DoctorsByDate)
