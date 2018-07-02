import React from 'react'
import Link from 'next/link'
import { SearchBar } from 'antd-mobile'

import { Tabs, Tab } from '../Common/Tabs'

import './appointment.scss'

class Index extends React.Component {
  render() {
    const tabs = this.props.parent
    const content = this.props.child
    return (
      <div>
        <SearchBar placeholder='请输入子科室名称进行搜索' maxLength={8} />
        <Tabs handleTabClick={this.props.handleTabClick}>{
          tabs.map((tab,index) => <Tab title={tab.deptName} key={index}>{
            content.map((content, index) => (
              <Link href='/appointment/detail' key={index}>
                <div className='department__content'>{content.deptName}</div>
              </Link>
            ))}</Tab>)
        }</Tabs>
      </div>
    )
  }
}

export default Index
