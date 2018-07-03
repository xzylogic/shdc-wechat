import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { SearchBar } from 'antd-mobile'

import { Tabs, Tab } from '../Common/Tabs'
import { loadDepartmentsChild } from '../../store/actions/departments.action'

import './appointment.scss'


class RenderLink extends React.Component {
  render() {
    const pageType = this.props.pageType
    const hosOrgCode = this.props.hosOrgCode
    const deptCode = this.props.deptCode
    switch(pageType) {
      case '1':
        return (<Link href={`/appointment/doctors/${hosOrgCode}/${deptCode}`}>{this.props.children}</Link>)
      case '2':
        return (<Link href={`/appointment/consultation/${hosOrgCode}/${deptCode}/${pageType}`}>{this.props.children}</Link>)
      case '3':
        return (<Link href={`/appointment/consultation/${hosOrgCode}/${deptCode}/${pageType}`}>{this.props.children}</Link>)
      default:
        return this.props.children
    }
  }
}

class Index extends React.Component {
  handleTabClick = (index) => {
    const store = this.props
    const { departmentsReducer } = store
    const { hosOrgCode, deptType, departmentsParent} = departmentsReducer
    store.dispatch(loadDepartmentsChild(hosOrgCode, deptType, departmentsParent[index].hosDeptCode))
  }

  render() {
    const { departmentsReducer } = this.props
    const { departmentsParent, departmentsChild, pageType, hosOrgCode } = departmentsReducer
    return (
      <div>
        <SearchBar placeholder='请输入子科室名称进行搜索' maxLength={8} />
        <Tabs handleTabClick={this.handleTabClick}>{
          departmentsParent.map((tab,index) => <Tab title={tab.deptName} key={index}>{
            departmentsChild.map((content, index) => (
              <RenderLink pageType={pageType} hosOrgCode={hosOrgCode} deptCode={content.hosDeptCode}  key={index}>
                <div className='department__content'>{content.deptName}</div>
              </RenderLink>
            ))}</Tab>)
        }</Tabs>
      </div>
    )
  }
}

export default connect(state => state)(Index)
