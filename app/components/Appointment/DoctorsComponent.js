import React from 'react'
import { connect } from 'react-redux'
import { SearchBar, SegmentedControl, WingBlank, WhiteSpace } from 'antd-mobile'

import DoctorList from './DoctorList'
import DoctorsDateList from './DoctorsDateList'

import { updateDoctorsSearchParamAction, loadDoctorsSearchAction } from '../..//store/actions/appointment/doctors.action'

import './appointment.scss'

class Index extends React.Component {
  state = {
    selectedIndex: 0
  }

  handleSearch = async (value) => {
    const store = this.props
    await store.dispatch(updateDoctorsSearchParamAction(value))
    await store.dispatch(loadDoctorsSearchAction())
  }

  render() {
    const { doctorsReducer } = this.props
    const { doctorsByName, searchParam, doctorsSearch } = doctorsReducer
    return (
      <div style={{background: '#fff', minHeight: '100vh'}}>
        <SearchBar placeholder='请输入医生姓名进行搜索' value={searchParam} onChange={this.handleSearch} maxLength={8} />
        {
          !searchParam ? (
            <React.Fragment>
              <WhiteSpace size='lg' />
              <WingBlank size='lg'>
                <SegmentedControl 
                  selectedIndex={this.state.selectedIndex}
                  onChange={(e) => this.setState({selectedIndex: e.nativeEvent.selectedSegmentIndex})}
                  values={['按专家预约', '按日期预约']} 
                  style={{ height: '40px', margin: '0px 10% 0 10%' }} />
              </WingBlank>
              <WhiteSpace size='lg' />
              {
                this.state.selectedIndex === 0 ? 
                  <div style={{height: 'calc(100vh - 114px)', overflow: 'scroll', borderTop: '1px solid #eee'}}>
                    <DoctorList doctors={doctorsByName} />
                  </div> : <DoctorsDateList />
              }
            </React.Fragment>
          ) : <DoctorList doctors={doctorsSearch} />
        }
      </div>
    )
  }
}

export default connect(state => state)(Index)
