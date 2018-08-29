import React from 'react'
import Router from 'next/router'

import { FlexItem, ImgContainer, MainContainer } from '../Common/FlexList'
import { NullList } from '../Common/Null'
import { checkNotNullArr, calcDistance, Convert_BD09_To_GCJ02 } from '../../utilities/common'

class Index extends React.Component {
  state = {
    lat: null,
    lng: null
  }

  handleClick = (obj) => {
    Router.push(
      `/appointment/entrance?hosOrgCode=${obj.hosOrgCode}&hosDeptCode=0&toHosDeptCode=0`,
      `/appointment/entrance/${obj.hosOrgCode}/0/0`
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

  componentWillUpdate() {
    window.wx.ready(() => {
      window.wx.getLocation({
        type: 'wgs84', 
        success: (res) => {
          let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          let speed = res.speed // 速度，以米/每秒计
          let accuracy = res.accuracy // 位置精度
          this.setState({
            lat: latitude,
            lng: longitude
          })
        }
      })
    })
  }

  getDistance = (lat, lng) => {
    let distence = ''
    if (lat && lng && this.state.lat !== null && this.state.lng !== null) {
      distence = calcDistance(lat, lng, this.state.lat, this.state.lng)
    }
    return distence
  }

  render() {
    const hospitals = this.props.hospitals || []
    return (
      <div style={{background: '#fff'}}>{
      checkNotNullArr(hospitals) ? hospitals.map((obj, index) => (
        <div key={index} className='flex__list__border'>
          <FlexItem
            sub={<ImgContainer 
              style={{padding: '15px'}} 
              src={`https://shdcapp.wondersgroup.com/mobilemedicalplatform${obj.hosImage}`} 
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
      )) : <NullList />
      }</div>
    )
  }
}

export default Index
