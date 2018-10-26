import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { connect } from 'react-redux'
import { Tabs, SearchBar } from 'antd-mobile'
import * as debounce from 'lodash.debounce'

import HospitalList from './HospitalList/HospitalList'
import {
  loadHospitalsAction, updateSearchParamAction,
  loadSearchAction, updateTabAction
} from '../../../store/actions/appointment/hospitals.action'
import { updateGlobalLocation } from '../../../store/actions/global.action'
import { calcDistance, Convert_BD09_To_GCJ02 } from '../../../utilities/common'

import classes from './HospitalsComponent.scss'

export class Hospitals extends Component {

  componentDidMount() {
    window.wx.ready(() => {
      window.wx.getLocation({
        type: 'wgs84', 
        success: (res) => {
          let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          let speed = res.speed // 速度，以米/每秒计
          let accuracy = res.accuracy // 位置精度

          this.props.onGlobalLocationUpdate(latitude, longitude)
        }
      })
    })
  }

  tabs = [
    { title: '全部' },
    { title: '综合' },
    { title: '中医' },
    { title: '专科' }
  ]

  handleTabClick = (tab, index) => {
    this.props.onTabUpdate(index)
  }

  handleSearch = (value) => {
    this.props.onSearchParamUpdate(value)
    if (value.replace(/\s/g, '')) {
      this.props.onLoadSearch(value)
    }
  }

  handleLocationClick = (event, obj) => {
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

  handleContentClick = (event, data) => {
    if (!data.sign) {
      Router.push(
        `/appointment/entrance?hosOrgCode=${data.hosOrgCode}&hosDeptCode=0&toHosDeptCode=0&deptName=null`,
        `/appointment/entrance/${data.hosOrgCode}/0/0/null`
      )
    }
    if (data.sign && data.sign === '1') {
      Router.push(
        `/appointment/entrance?hosOrgCode=${data.hosOrgCode}&hosDeptCode=0&toHosDeptCode=0&deptName=${data.deptName}`,
        `/appointment/entrance/${data.hosOrgCode}/0/0/${data.deptName}`
      )
    }
    if (data.sign && data.sign === '2') {
      Router.push(
        `/appointment/entrance?hosOrgCode=${data.hosOrgCode}&hosDeptCode=${data.hosDeptCode}&toHosDeptCode=${data.topHosDeptCode}&deptName=${data.deptName}`,
        `/appointment/entrance/${data.hosOrgCode}/${data.hosDeptCode}/${data.topHosDeptCode}/${data.deptName}`
      )
    }
    if (data.sign && data.sign === '3') {
      Router.push(
        `/appointment/doctor?hosDoctCode=${data.hosDoctCode}&hosOrgCode=${data.hosOrgCode}&hosDeptCode=${data.hosDeptCode}&toHosDeptCode=${data.topHosDeptCode}`,
        `/appointment/doctor/${data.hosDoctCode}/${data.hosOrgCode}/${data.hosDeptCode}/${data.topHosDeptCode}`
      )
    }
  }

  getDistance = (lat, lng) => {
    const globalLat = this.props.globalLat
    const globalLng = this.props.globalLng
    let distence = ''
    if (lat && lng && globalLat !== null && globalLng !== null) {
      distence = calcDistance(lat, lng, globalLat, globalLng)
    }
    return distence && Number(distence).toFixed(2) || ''
  }

  render() {
    let hospitals = ''
    if (!this.props.searchParam && this.props.hospitals) {
      const hospitalsAll = [...this.props.hospitals]
      const hospitalsZH = this.props.hospitals.filter(hos => hos.cityCode === 'zhyy')
      const hospitalsZY = this.props.hospitals.filter(hos => hos.cityCode === 'zyyy')
      const hospitalsZK = this.props.hospitals.filter(hos => hos.cityCode === 'zkyy')
      hospitals = (
        <Tabs
          tabs={this.tabs}
          initialPage={this.props.tabIndex}
          onChange={this.handleTabClick}>
          <HospitalList
            hospitals={hospitalsAll}
            getDistance={this.getDistance}
            onLoactionClick={this.handleLocationClick}
            onClick={this.handleContentClick} />
          <HospitalList
            hospitals={hospitalsZH}
            getDistance={this.getDistance}
            onLoactionClick={this.handleLocationClick}
            onClick={this.handleContentClick} />
          <HospitalList
            hospitals={hospitalsZY}
            getDistance={this.getDistance}
            onLoactionClick={this.handleLocationClick}
            onClick={this.handleContentClick} />
          <HospitalList
            hospitals={hospitalsZK}
            getDistance={this.getDistance}
            onLoactionClick={this.handleLocationClick}
            onClick={this.handleContentClick} />)
        </Tabs> 
      )
    } else if (this.props.searchParam && this.props.hospitalsSearch) {
      hospitals = <HospitalList 
        hospitals={this.props.hospitalsSearch}
        onClick={this.handleContentClick} />
    }

    const mapClass = ['anticon', 'icon-enviroment', classes.MapIcon]

    return (
      <React.Fragment>
        <div style={{paddingRight: '30px'}}>
          <SearchBar 
            placeholder='请输入医院名称、科室、专家姓名' 
            value={this.props.searchParam}
            onChange={this.handleSearch}
            maxLength={20} 
          />
        </div>
        <div style={{position: 'absolute', top: 0, right: 0, padding: '10px 3px', background: '#efeff4'}}>
          <Link href='/appointment/map'>
            <i className={mapClass.join(' ')} />
          </Link>
        </div>
        {hospitals}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchParam: state.hospitalsReducer.searchParam,
    tabIndex: state.hospitalsReducer.tab,
    hospitals: state.hospitalsReducer.hospitalsAll,
    hospitalsSearch: state.hospitalsReducer.hospitalsSearch,
    globalLat: state.globalReducer.globalLat, 
    globalLng: state.globalReducer.globalLng
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadHospitals: () => dispatch(loadHospitalsAction()),
    onTabUpdate: (index) => dispatch(updateTabAction(index)),
    onSearchParamUpdate: (value) => dispatch(updateSearchParamAction(value)),
    onLoadSearch: debounce((value) => dispatch(loadSearchAction(value)), 500),
    onGlobalLocationUpdate: (lat, lng) => dispatch(updateGlobalLocation(lat, lng))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hospitals)
