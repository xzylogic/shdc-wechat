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
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <HospitalList />
          <HospitalList />
          <HospitalList />
          <HospitalList />
        </Tabs> 
      </div>
    )
  }
}

export default Index
