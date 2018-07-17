import React from 'react'
import { connect } from 'react-redux'
import { Tabs, SearchBar } from 'antd-mobile'

import HospitalList from './HospitalList'
import SearchList from './SearchList'

import { updateTab, updateSearchParam, loadSearchAction } from '../../store/actions/appointment/hospitals.action'
import { checkNullArr } from '../../utilities/common'

import './appointment.scss'

class Index extends React.Component {
  handleTabClick = (tab, index) => {
    const store = this.props
    store.dispatch(updateTab(index))
  }

  handleSearch = (value) => {
    const store = this.props
    store.dispatch(updateSearchParam(value))
    if (value.replace(/\s/g, '')) {
      store.dispatch(loadSearchAction(value))
    }
  }

  render() { 
    const tabs = [
      { title: '全部' },
      { title: '综合' },
      { title: '中医' },
      { title: '专科' }
    ]
    const { hospitalsReducer } = this.props
    const { tab, hospitalsAll, hospitalsZH, hospitalsZY, hospitalsZK, searchParam, hospitalsSearch } = hospitalsReducer
    return (
      <div>
        <SearchBar 
          placeholder='请输入医院名称、科室、专家姓名' 
          value={searchParam}
          onChange={this.handleSearch}
          maxLength={20} 
        />
        { !searchParam ? (
          <Tabs tabs={tabs}
            initialPage={tab}
            onChange={this.handleTabClick}
          >
            <div>{
              !checkNullArr(hospitalsAll) ?  (<HospitalList hospitals={hospitalsAll} />) : ''
            }</div>
            <div>{
              !checkNullArr(hospitalsZH) ?  (<HospitalList hospitals={hospitalsZH} />) : ''
            }</div>
            <div>{
              !checkNullArr(hospitalsZY) ?  (<HospitalList hospitals={hospitalsZY} />) : ''
            }</div>
            <div>{
              !checkNullArr(hospitalsZK) ?  (<HospitalList hospitals={hospitalsZK} />) : ''
            }</div>
          </Tabs> 
        ) : <SearchList searchList={hospitalsSearch} />}
      </div>
    )
  }
}

export default connect(state => state)(Index)
