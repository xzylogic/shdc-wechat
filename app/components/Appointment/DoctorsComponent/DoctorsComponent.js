import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { SearchBar, SegmentedControl, WingBlank, WhiteSpace } from 'antd-mobile'
import * as debounce from 'lodash.debounce'

import DoctorsByDate from './DoctorsByDate/DoctorsByDate'
import DoctorsByName from './DoctorsByName/DcotorsByName'
import { updateDoctorsSearchParamAction, loadDoctorsSearchAction } from '../../../store/actions/appointment/doctors.action'

import classes from './DoctorsComponent.scss'

class Index extends React.Component {
  state = {
    selectedIndex: 0
  }

  handleSearch = async (value) => {
    await this.props.onDoctorsSearchParamUpdate(value)
    await this.props.onLoadDoctorsSearch()
  }

  handleDoctorClick = (event, data) => {
    Router.push(
      `/appointment/doctor?hosDoctCode=${data.hosDoctCode}&hosOrgCode=${data.hosOrgCode}&hosDeptCode=${data.hosDeptCode}&toHosDeptCode=${data.topHosDeptCode}`,
      `/appointment/doctor/${data.hosDoctCode}/${data.hosOrgCode}/${data.hosDeptCode}/${data.topHosDeptCode}`
    )
  }

  render() {
    let doctorsContent = ''
    if (!this.props.searchParam) {

      const doctorsList = this.state.selectedIndex === 0 ? 
        <DoctorsByName doctors={this.props.doctorsByName} onClick={this.handleDoctorClick} /> : 
        <DoctorsByDate doctors={this.props.doctorsByDate} />

      doctorsContent = (
        <React.Fragment>
          <WhiteSpace size='lg' />
          <WingBlank size='lg'>
            <SegmentedControl
              selectedIndex={this.state.selectedIndex}
              onChange={(e) => this.setState({selectedIndex: e.nativeEvent.selectedSegmentIndex})}
              values={['按专家预约', '按日期预约']}
              style={{ height: '40px', margin: '0px 10% 0 10%' }} />
          </WingBlank>
          <WhiteSpace size='lg' style={{borderBottom: '1px solid #eee'}} />
          <div className={classes.DoctorsContent}>{doctorsList}</div>
        </React.Fragment>
      )

    } else {
      doctorsContent = (
        <div className={classes.SearchContent}>
          <DoctorsByName
            doctors={this.props.doctorsSearch}
            onClick={this.handleDoctorClick} />
        </div>
      )
    }
    return (
      <div style={{background: '#fff', minHeight: '100vh'}}>
        <SearchBar
          placeholder='请输入医生姓名进行搜索'
          value={this.props.searchParam}
          onChange={this.handleSearch}
          maxLength={8} />
        {doctorsContent}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    doctorsByName: state.doctorsReducer.doctorsByName,
    doctorsByDate: state.doctorsReducer.doctorsByDate,
    searchParam: state.doctorsReducer.searchParam, 
    doctorsSearch: state.doctorsReducer.doctorsSearch
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDoctorsSearchParamUpdate: (value) => dispatch(updateDoctorsSearchParamAction(value)),
    onLoadDoctorsSearch:  debounce(() => dispatch(loadDoctorsSearchAction())),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
