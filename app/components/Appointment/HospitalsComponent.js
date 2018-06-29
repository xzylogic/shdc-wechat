import React from 'react'
import { Tabs, Badge, SearchBar } from 'antd-mobile'

import HospitalList from './HospitalList'

import './appointment.scss'

class Index extends React.Component {
  render() {
    const tabs = [
      { title: '全部' },
      { title: '综合' },
      { title: '中医' },
      { title: '专科' }
    ]
    return (
      <div>
        <SearchBar placeholder='请输入医院名称、科室、专家姓名' maxLength={8} />
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <HospitalList hospitals={this.props.hospitalsAll} />
          <HospitalList hospitals={this.props.hospitalsZH} />
          <HospitalList hospitals={this.props.hospitalsZY} />
          <HospitalList hospitals={this.props.hospitalsZK} />
        </Tabs> 
      </div>
    )
  }
}

export default Index
