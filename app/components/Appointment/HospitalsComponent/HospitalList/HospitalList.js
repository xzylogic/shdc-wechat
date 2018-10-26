import React from 'react'

import FlexItem from '../../../UI/FlexItem/FlexItem'
import ImageContainer from '../../../UI/ImageContainer/ImageContainer'
import { NullList } from '../../../Common/Null'
import { checkNotNullArr, checkNullArr } from '../../../../utilities/common'

import classes from './HospitalList.scss'

const hospitalList = (props) => {
  let hospitals = ''
  if (checkNotNullArr(props.hospitals)) {
    hospitals = props.hospitals.map((hospital, i) => {
      const iconClass = ['anticon', 'icon-enviroment', classes.Icon]
      const distance = props.getDistance && props.getDistance(hospital.latitude, hospital.longitude)
      let imgUrl = ''
      let defalutImgUrl = ''
      let mainContent = ''
      if (!hospital.sign) {
        imgUrl = `https://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${hospital.hosOrgCode}.jpg`
        defalutImgUrl = '/static/images/avatar_hospital.png'
        mainContent = (
          <div className={classes.HospitalContent}>
            <p className={classes.Title}>
              {hospital.hosName} <span className={classes.Distance}>{distance ? distance + 'km' : ''}</span>
            </p>
            <p className={classes.Content}>地址：{hospital.hospitalAdd} 
              <i className={iconClass.join(' ')} onClick={(event) => props.onLoactionClick(event, hospital)} />
            </p>
          </div>
        )
      }
      if (hospital.sign && hospital.sign === '1') {
        imgUrl = `https://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${hospital.hosOrgCode}.jpg`
        defalutImgUrl = '/static/images/avatar_hospital.png'
        mainContent = (
          <div className={classes.HospitalContent}>
            <p className={classes.Title}>{hospital.hosName}</p>
            <p className={classes.Content}>医院等级：{hospital.hospitalGrade}</p>
            <p className={classes.Content}>医院地址：{hospital.hospitalAdd}</p>
          </div>
        )
      }
      if (hospital.sign && hospital.sign === '2') {
        imgUrl = `https://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${hospital.hosOrgCode}.jpg`
        defalutImgUrl = '/static/images/avatar_hospital.png'
        mainContent = (
          <div className={classes.HospitalContent}>
            <p className={classes.Title}>{hospital.deptName}</p>
            <p className={classes.Content}>医院名称：{hospital.hosName}</p>
            <p className={classes.Content}>医院地址：{hospital.hospitalAdd}</p>
          </div>
        )
      }
      if (hospital.sign && hospital.sign === '3') {
        imgUrl = `https://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${hospital.hosOrgCode}_${hospital.hosDoctCode}.jpg`
        defalutImgUrl = '/static/images/avatar_doctor.png'
        mainContent = (
          <div className={classes.HospitalContent}>
            <p className={classes.Title}>{hospital.doctName}</p>
            <p className={classes.Content}>医院名称：{hospital.hosName}</p>
            <p className={classes.Content}>科室名称：{hospital.deptName}</p>
            <p className={classes.Content}>医生特长：{hospital.doctInfo}</p>
          </div>
        )
      }
      return (
        <FlexItem
          key={i}
          containerClass={classes.HospitalList}
          subWidth='100px'
          subContent={
            <div style={{padding: '15px', height: '100px'}}>
              <ImageContainer src={imgUrl} defalutImage={defalutImgUrl} /> 
            </div>
          }
          extraWidth='0'
          extraContent=''
          onClick={(event) => props.onClick(event, hospital)}>
          {mainContent}
        </FlexItem>
      )
    })
  } else if (checkNullArr(props.hospitals)){
    hospitals = <NullList />
  }

  return (
    <div>
      {hospitals}
    </div>
  )
} 

export default hospitalList
