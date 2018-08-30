import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { SearchBar } from 'antd-mobile'

import { Tabs, Tab } from '../Common/Tabs'
import { NullContent } from '../Common/Null'
import { checkNotNullArr } from '../../utilities/common'
import { loadDepartmentsChildAction, updateDepartmentsParamAction, loadDepartmentsSearchAction } from '../../store/actions/appointment/departments.action'

import './appointment.scss'


class Index extends React.Component {
  state = {
    tabIndex: 0,
    searchTabIndex: 0
  }

  handleChange = async (value) => {
    const store = this.props
    await store.dispatch(updateDepartmentsParamAction(value))
    await store.dispatch(loadDepartmentsSearchAction())
  }

  handleTabClick = (index) => {
    const store = this.props
    const { departmentsReducer } = store
    const { departmentsParent } = departmentsReducer
    this.setState({
      tabIndex: index
    })
    store.dispatch(loadDepartmentsChildAction(departmentsParent[index].hosDeptCode, index))
  }

  handleSearchTabClick = (index) => {
    this.setState({
      searchTabIndex: index
    })
  }

  handleClick = (pageType, hosOrgCode, parent, child) => {
    switch(pageType) {
      case '1':
        Router.push(
          `/appointment/doctors?hosOrgCode=${hosOrgCode}&hosDeptCode=${child.hosDeptCode}&toHosDeptCode=${parent.hosDeptCode}`,
          `/appointment/doctors/${hosOrgCode}/${child.hosDeptCode}/${parent.hosDeptCode}`
        )
        return
      case '2':
        Router.push(
          `/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${child.hosDeptCode}&toHosDeptCode=${parent.hosDeptCode}&pageType=${pageType}&deptName=${child.deptName}`,
          `/appointment/consultation/${hosOrgCode}/${child.hosDeptCode}/${parent.hosDeptCode}/${pageType}/${child.deptName}`
        )
        return
      case '3':
        Router.push(
          `/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${child.hosDeptCode}&toHosDeptCode=${parent.hosDeptCode}&pageType=${pageType}&deptName=${child.deptName}`, 
          `/appointment/consultation/${hosOrgCode}/${child.hosDeptCode}/${parent.hosDeptCode}/${pageType}/${child.deptName}`
        )
        return
      default:
        return ''
    }
  }

  render() {
    const { departmentsReducer } = this.props
    const { departmentsParent, pageType, hosOrgCode, searchParam, searchDepartments } = departmentsReducer
    return (
      <div>
        <SearchBar placeholder='请输入子科室名称进行搜索' maxLength={8} value={searchParam} onChange={this.handleChange} />
        {
          searchParam === '' ? (
            <Tabs index={this.state.tabIndex}  handleTabClick={this.handleTabClick}>{
              checkNotNullArr(departmentsParent) && departmentsParent.map((departments,indexP) => 
                <Tab title={departments.deptName} key={indexP}>
                {
                  checkNotNullArr(departments.children) ? departments.children.map(
                    (children, indexC) => (
                      <div 
                        key={indexC} 
                        className='department__content'
                        onClick={this.handleClick.bind(this, pageType, hosOrgCode, departments, children)}
                      >{children.deptName}</div>
                    )
                  ) : <NullContent msg='暂无子科室' /> 
                }</Tab>)
            }</Tabs>) : (
            <Tabs index={this.state.searchTabIndex} handleTabClick={this.handleSearchTabClick} >{
              checkNotNullArr(searchDepartments) && searchDepartments.map((departments,indexP) => 
                <Tab title={departments.deptName} key={indexP}>{
                  checkNotNullArr(departments.children) ? 
                    departments.children && Array.isArray(departments.children) && departments.children.map(
                      (children, indexC) => (
                        <div 
                        key={indexC} 
                        className='department__content'
                        onClick={this.handleClick.bind(this, pageType, hosOrgCode, departments, children)}
                      >{children.deptName}</div>
                      )
                    ) : <NullContent msg='暂无子科室' />
                }</Tab>)
            }</Tabs>
          )
        }
      </div>
    )
  }
}

export default connect(state => state)(Index)
