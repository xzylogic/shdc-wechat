import React from 'react'
import { connect } from 'react-redux'
import { Tabs, SearchBar } from 'antd-mobile'

import '../Appointment/appointment.scss'

import WaitingHospitalList from './WaitingHospitalList'
import { checkNullArr } from '../../utilities/common'
import { updateWaitingHospitalsTabAction, updateWaitingHospitalsParamAction } from '../../store/actions/personal/waiting.action'

class Index extends React.Component {
  handleTabClick = (value, i) => {
    const store = this.props
    store.dispatch(updateWaitingHospitalsTabAction(i))
  }
 
  handleSearch = (value) => {
    const store = this.props
    store.dispatch(updateWaitingHospitalsParamAction(value))
  }

  render() {
    const { waitingReducer } = this.props
    const { waitingHospitals, waitingSearchHospitals, hospitalTab, hospitalParam, pageType } = waitingReducer
    const tabs = [
      { title: '全部' },
      { title: '综合' },
      { title: '中医' },
      { title: '专科' }
    ]
    const tab = 0
    return (
      <div>
        <SearchBar 
          placeholder='请输入医院名称' 
          value={hospitalParam}
          onChange={this.handleSearch}
          maxLength={20} 
        />
        { !hospitalParam ? (
          <Tabs tabs={tabs}
            initialPage={hospitalTab}
            onChange={this.handleTabClick}
          >
            <div>{
              !checkNullArr(waitingHospitals) ?  (
                <WaitingHospitalList pageType={pageType} hospitals={waitingHospitals} />
              ) : ''
            }</div>
            <div>{
              !checkNullArr(waitingHospitals.filter(obj => obj.cityCode === 'zhyy')) ?  (
                <WaitingHospitalList pageType={pageType} hospitals={waitingHospitals.filter(obj => obj.cityCode === 'zhyy')} />
              ) : ''
            }</div>
            <div>{
              !checkNullArr(waitingHospitals.filter(obj => obj.cityCode === 'zyyy')) ?  (
                <WaitingHospitalList pageType={pageType} hospitals={waitingHospitals.filter(obj => obj.cityCode === 'zyyy')} />
              ) : ''
            }</div>
            <div>{
              !checkNullArr(waitingHospitals.filter(obj => obj.cityCode === 'zkyy')) ?  (
                <WaitingHospitalList pageType={pageType} hospitals={waitingHospitals.filter(obj => obj.cityCode === 'zkyy')} />
              ) : ''
            }</div>
          </Tabs> 
        ) : ''
        }
      </div>
    )
  }
}

export default connect(state => state)(Index)
