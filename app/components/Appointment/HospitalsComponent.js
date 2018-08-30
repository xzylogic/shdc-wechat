import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Tabs, SearchBar } from 'antd-mobile'

import HospitalList from './HospitalList'
import SearchList from './SearchList'

import { updateTab, updateSearchParam, loadSearchAction } from '../../store/actions/appointment/hospitals.action'
import { checkNotNullArr } from '../../utilities/common'
import { NullList } from '../Common/Null'

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
    const { hospitalsReducer, globalReducer } = this.props
    const { tab, hospitalsAll, searchParam, hospitalsSearch } = hospitalsReducer
    const { globalLat, globalLng } = globalReducer
    const hospitalsZH = hospitalsAll.filter(obj => obj.cityCode === 'zhyy')
    const hospitalsZY = hospitalsAll.filter(obj => obj.cityCode === 'zyyy')
    const hospitalsZK = hospitalsAll.filter(obj => obj.cityCode === 'zkyy')
    return (
      <div>
        <div style={{paddingRight: '30px'}}>
          <SearchBar 
            placeholder='请输入医院名称、科室、专家姓名' 
            value={searchParam}
            onChange={this.handleSearch}
            maxLength={20} 
          />
        </div>
        <div style={{position: 'absolute', top: 0, right: 0, padding: '10px 3px', background: '#efeff4'}}>
          <Link href='/appointment/map'>
            <i className='anticon icon-enviroment hospital__icon' style={{fontSize: '20px'}} />
          </Link>
        </div>
        { !searchParam ? (
          <Tabs tabs={tabs}
            initialPage={tab}
            onChange={this.handleTabClick}
          >
            <div>{
              checkNotNullArr(hospitalsAll) ?  (<HospitalList hospitals={hospitalsAll} />) : <NullList />
            }</div>
            <div>{
              checkNotNullArr(hospitalsZH) ?  (<HospitalList hospitals={hospitalsZH} />) : <NullList />
            }</div>
            <div>{
              checkNotNullArr(hospitalsZY) ?  (<HospitalList hospitals={hospitalsZY} />) : <NullList />
            }</div>
            <div>{
              checkNotNullArr(hospitalsZK) ?  (<HospitalList hospitals={hospitalsZK} />) : <NullList />
            }</div>
          </Tabs> 
        ) : <SearchList searchList={hospitalsSearch} />}
      </div>
    )
  }
}

export default connect(state => state)(Index)
