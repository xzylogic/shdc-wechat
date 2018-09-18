import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import { FlexItem, ImgContainer, MainContainer } from '../Common/FlexList'
import { NullList } from '../Common/Null'
import { checkNotNullArr, calcDistance, Convert_BD09_To_GCJ02, checkNullArr } from '../../utilities/common'
import { updateGlobalLocation } from '../../store/actions/global.action'

class Index extends React.Component {
  state = {
    imageSrc: ''
  }

  handleClick = (obj) => {
    Router.push(
      `/appointment/entrance?hosOrgCode=${obj.hosOrgCode}&hosDeptCode=0&toHosDeptCode=0&deptName=null`,
      `/appointment/entrance/${obj.hosOrgCode}/0/0/null`
    )
  }

  handleMapClick = (obj, event) => {
    event.stopPropagation()

    let location = Convert_BD09_To_GCJ02(obj.latitude, obj.longitude)

    window.wx.openLocation({
      latitude: location.lat, // 纬度，浮点数，范围为90 ~ -90
      longitude: location.lng, // 经度，浮点数，范围为180 ~ -180。
      name: obj.hosName, // 位置名
      address: obj.hospitalAdd, // 地址详情说明
      scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      })
  }

  componentDidMount() {
    const store = this.props
    window.wx.ready(() => {
      window.wx.getLocation({
        type: 'wgs84', 
        success: (res) => {
          let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          let speed = res.speed // 速度，以米/每秒计
          let accuracy = res.accuracy // 位置精度

          store.dispatch(updateGlobalLocation(latitude, longitude))
        }
      })
    })
  }

  getDistance = (lat, lng) => {
    const { globalReducer } = this.props
    const { globalLat, globalLng } = globalReducer
    let distence = ''
    if (lat && lng && globalLat !== null && globalLng !== null) {
      distence = calcDistance(lat, lng, globalLat, globalLng)
    }
    return distence && Number(distence).toFixed(2) || ''
  }

  nofind = (event) => {
    let img = event.target
    img.src = `/static/images/avatar_hospital.jpg`
    img.onError = null
  }

  render() {
    const hospitals = this.props.hospitals || []
    let hospitalList = ''
    if (typeof window !== 'undefined' && checkNotNullArr(hospitals)) {
            hospitalList = hospitals.map((obj, index) => (
              <div key={index} className='flex__list__border'>
                <FlexItem
                  sub={<ImgContainer 
                    style={{margin: '15px', width: '70px', maxHeight: '70px', overflow: 'hidden'}} 
                    src={`https://yuyue.shdc.org.cn:9080/uploadImage/docImgSmall/${obj.hosOrgCode}.jpg`} 
                    onError={this.nofind}
                  />}
                  extra=''
                  widthSub='100px'
                  widthExtra='15px'
                  onClick={this.handleClick.bind(this, obj)}
                >
                  <MainContainer className='hospital__desc'>
                    <p>{obj.hosName}<span style={{fontSize: '11px', color: '#999', padding: '0 5px'}}>{
                      this.getDistance(obj.latitude, obj.longitude) ? 
                      `${this.getDistance(obj.latitude, obj.longitude)}km` : ''
                    }</span></p>
                    <p>
                      地址：{obj.hospitalAdd} 
                      <i className='anticon icon-enviroment hospital__icon' onClick={this.handleMapClick.bind(this, obj)} />
                    </p>
                  </MainContainer>
                </FlexItem>
              </div>
            ))
    }

    if (checkNullArr(hospitals)) {
      hospitalList = <NullList />
    }

    return (
      <div style={{background: '#fff'}}>{hospitalList}</div>
    )
  }
}

export default connect(state => state)(Index)
