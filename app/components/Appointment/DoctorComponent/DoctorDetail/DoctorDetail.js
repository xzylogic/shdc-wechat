import React from 'react'

import FlexItem from '../../../UI/FlexItem/FlexItem'
import ImageContainer from '../../../UI/ImageContainer/ImageContainer'

import classes from './DoctorDetail.scss'

const doctorDetail = (props) => {
  const defalutImgUrl = '/static/images/avatar_doctor.png'
  const imageUrl = `https://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${props.doctor.hosOrgCode}_${props.doctor.hosDoctCode}.jpg`
  return (
    <React.Fragment>
      <FlexItem
        containerClass={classes.DoctorDetail}
        subWidth='100px'
        subContent={
          <div style={{padding: '15px', height: '100px'}}>
            <ImageContainer
              src={imageUrl}
              defalutImage={defalutImgUrl}
              containerStyle={{borderRadius: '50%', width: '65px', height: '65px'}} /> 
          </div>
        }
        extraWidth='0'
        extraContent=''
        onClick={(event) => props.onClick(event, doctor)}>
        <div className={classes.DoctorContent}>
          <p className={classes.Title}>{props.doctor.doctName}</p>
          <p>{props.doctor.doctTile}</p>
        </div>
      </FlexItem>
      <div className={classes.DoctorDesc}>专家简介：{props.doctor.doctInfo}</div>
      <div className={classes.DoctorDesc}>门诊时间：{props.schedules}</div>
    </React.Fragment>
  )
}

export default doctorDetail