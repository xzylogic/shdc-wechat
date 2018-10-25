import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { SearchBar } from 'antd-mobile'
import * as debounce from 'lodash.debounce'

import { Tabs, Tab } from '../../UI/Tabs/Tabs'
import { NullContent} from '../../Common/Null'
import {
  loadDepartmentsChildAction,
  updateDepartmentsParamAction,
  loadDepartmentsSearchAction
} from '../../../store/actions/appointment/departments.action'
import { checkNotNullArr } from '../../../utilities/common'

import classes from './DepartmentsComponent.scss'

export class DepartmentComponent extends Component {
  state = {
    tabIndex: 0,
    searchTabIndex: 0
  }

  handleTabClick = (event, index) => {
    this.setState({
      tabIndex: index
    })
    this.props.onLoadDepartmentsChild(this.props.departmentsParent[index].hosDeptCode, index)
  }

  handleSearchTabClick = (index) => {
    this.setState({
      searchTabIndex: index
    })
  }

  handleSearch = async (value) => {
    await this.props.onDepartmentsParamUpdate(value)
    await this.props.onLoadDepartmentsSearch()
  }

  // handleClick = (pageType, hosOrgCode, parent, child) => {
  //   switch(pageType) {
  //     case '1':
  //       Router.push(
  //         `/appointment/doctors?hosOrgCode=${hosOrgCode}&hosDeptCode=${child.hosDeptCode}&toHosDeptCode=${parent.hosDeptCode}`,
  //         `/appointment/doctors/${hosOrgCode}/${child.hosDeptCode}/${parent.hosDeptCode}`
  //       )
  //       return
  //     case '2':
  //       Router.push(
  //         `/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${child.hosDeptCode}&toHosDeptCode=${parent.hosDeptCode}&pageType=${pageType}&deptName=${child.deptName}`,
  //         `/appointment/consultation/${hosOrgCode}/${child.hosDeptCode}/${parent.hosDeptCode}/${pageType}/${child.deptName}`
  //       )
  //       return
  //     case '3':
  //       Router.push(
  //         `/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${child.hosDeptCode}&toHosDeptCode=${parent.hosDeptCode}&pageType=${pageType}&deptName=${child.deptName}`, 
  //         `/appointment/consultation/${hosOrgCode}/${child.hosDeptCode}/${parent.hosDeptCode}/${pageType}/${child.deptName}`
  //       )
  //       return
  //     default:
  //       return ''
  //   }
  // }

  render() {
    const departmentsParent = [...this.props.departmentsParent]
    let departments = ''
    if (!this.props.searchParam && checkNotNullArr(departmentsParent)) {
      departments = (
        <Tabs
          mode='vertical'
          containerStyle={{height: 'calc(100vh - 44px)'}}
          index={this.state.tabIndex}
          handleTabClick={this.handleTabClick}>
          {
            departmentsParent.map((departments,indexP) => {
              let children = ''
              if(checkNotNullArr(departments.children)) {
                const departmentsChildren = [...departments.children]
                children = departmentsChildren.map((children, indexC) => (
                  <div
                    key={indexC}
                    className={classes.DepartmentList}
                    onClick={(event) => this.handleClick.bind(event, children)}>
                    {children.deptName}
                  </div>
                ))
              } else {
                children = <NullContent msg='暂无子科室' /> 
              }
              return (
                <Tab title={departments.deptName} key={indexP}>
                {children}
                </Tab>
              )
            })
          }
        </Tabs>
      )
    }
    return (
      <div>
        <SearchBar
          placeholder='请输入子科室名称进行搜索'
          maxLength={8} value={this.props.searchParam}
          onChange={this.handleSearch} />
          {departments}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    departmentsParent: state.departmentsReducer.departmentsParent,
    pageType: state.departmentsReducer.pageType, 
    hosOrgCode: state.departmentsReducer.hosOrgCode, 
    searchParam: state.departmentsReducer.searchParam, 
    searchDepartments: state.departmentsReducer.searchDepartments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadDepartmentsChild: (deptCode, index) => dispatch(loadDepartmentsChildAction(deptCode, index)),
    onDepartmentsParamUpdate: (value) => dispatch(updateDepartmentsParamAction(value)),
    onLoadDepartmentsSearch:  debounce(() => dispatch(loadDepartmentsSearchAction())),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentComponent)
