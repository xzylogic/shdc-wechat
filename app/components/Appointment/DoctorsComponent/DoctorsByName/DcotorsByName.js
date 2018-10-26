import React from 'react'

import FlexItem from '../../../UI/FlexItem/FlexItem'
import ImageContainer from '../../../UI/ImageContainer/ImageContainer'
import { NullImageContent } from '../../../Common/Null'
import { checkNotNullArr, checkNullArr } from '../../../../utilities/common'

import classes from './DoctorsByName.scss'

const dcotorsByName = (props) => {
  let defalutImgUrl = '/static/images/avatar_doctor.png'
  let doctorLists = ''
  if (checkNotNullArr(props.doctors)) {
    doctorLists = props.doctors.map((doctor, i) => {
      const imageUrl = `https://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${doctor.hosOrgCode}_${doctor.hosDoctCode}.jpg`
      return <FlexItem
        key={i}
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
        onClick={(event) => props.onClick(event, doctor)}>
        <div className={classes.DoctorInfoContent}>
          <p className={classes.Title}>{doctor.doctName} {doctor.doctTile}</p>
          <p className={classes.Content}>{doctor.doctInfo}</p>
        </div>
      </FlexItem>
    })
  } else if (checkNullArr(props.doctors)) {
    doctorLists = (
      <div className={classes.CenterContent}>
        <NullImageContent msg='暂无可预约专家、医生信息' image='/static/images/icon-null-doctor.png' />
      </div>
    )
  }
  return (
    <React.Fragment>
      {doctorLists}
    </React.Fragment>
  )
}

export default dcotorsByName
