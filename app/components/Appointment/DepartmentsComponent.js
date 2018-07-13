import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { SearchBar } from 'antd-mobile'

import { Tabs, Tab } from '../Common/Tabs'
import { loadDepartmentsChildAction } from '../../store/actions/appointment/departments.action'

import './appointment.scss'

const RenderLink = ({hosOrgCode, hosDeptCode, toHosDeptCode, pageType, children}) => {
    switch(pageType) {
      case '1':
        return (
          <Link 
            href={`/appointment/doctors?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}`} 
            as={`/appointment/doctors/${hosOrgCode}/${hosDeptCode}`}>
            {children}
          </Link>)
      case '2':
        return (
          <Link 
            href={`/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&toHosDeptCode=${toHosDeptCode}&pageType=${pageType}`} 
            as={`/appointment/consultation/${hosOrgCode}/${hosDeptCode}/${toHosDeptCode}/${pageType}`}>
            {children}
          </Link>)
      case '3':
      return (
        <Link 
          href={`/appointment/consultation?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&toHosDeptCode=${toHosDeptCode}&pageType=${pageType}`} 
          as={`/appointment/consultation/${hosOrgCode}/${hosDeptCode}/${toHosDeptCode}/${pageType}`}>
          {children}
        </Link>)
      default:
        return ''
    }
}

class Index extends React.Component {

  handleTabClick = (index) => {
    const store = this.props
    const { departmentsReducer } = store
    const { departmentsParent } = departmentsReducer
    this.setState({
      index: departmentsParent[index].hosDeptCode
    })
    store.dispatch(loadDepartmentsChildAction(departmentsParent[index].hosDeptCode))
  }

  render() {
    const { departmentsReducer } = this.props
    const { departmentsParent, departmentsChild, pageType, hosOrgCode, toHosDeptCode } = departmentsReducer
    return (
      <div>
        <SearchBar placeholder='请输入子科室名称进行搜索' maxLength={8} />
        <Tabs handleTabClick={this.handleTabClick}>{
          departmentsParent.map((tab,indexP) => <Tab title={tab.deptName} key={indexP}>{
            departmentsChild.map((content, indexC) => (
              <RenderLink pageType={pageType} hosOrgCode={hosOrgCode} hosDeptCode={content.hosDeptCode} toHosDeptCode={toHosDeptCode} key={indexC}>
                <div className='department__content'>{content.deptName}</div>
              </RenderLink>
            ))}</Tab>)
        }</Tabs>
      </div>
    )
  }
}

export default connect(state => state)(Index)
