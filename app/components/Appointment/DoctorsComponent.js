import React from 'react'
import { SearchBar, SegmentedControl, WingBlank, WhiteSpace } from 'antd-mobile'

import DoctorList from './DoctorList'
import DoctorsDateList from './DoctorsDateList'

import './appointment.scss'

class Index extends React.Component {
  state = {
    selectedIndex: 0
  }

  render() {
    return (
      <div style={{background: '#fff', minHeight: '100vh'}}>
        <SearchBar placeholder='请输入医生姓名进行搜索' maxLength={8} />
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <SegmentedControl 
            selectedIndex={this.state.selectedIndex}
            onChange={(e) => this.setState({selectedIndex: e.nativeEvent.selectedSegmentIndex})}
            values={['按专家预约', '按日期预约']} 
            style={{ height: '40px', margin: '0px 10% 0 10%' }} />
        </WingBlank>
        <WhiteSpace size='lg' />
        {this.state.selectedIndex === 0 ? 
          <div style={{height: 'calc(100vh - 114px)', overflow: 'scroll', borderTop: '1px solid #eee'}}>
            <DoctorList />
          </div> : <DoctorsDateList />}
        
      </div>
    )
  }
}

export default Index
