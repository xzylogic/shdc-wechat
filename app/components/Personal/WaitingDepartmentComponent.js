import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { SearchBar, List } from 'antd-mobile'

import { checkNotNullArr } from '../../utilities/common'
import { updateWaitingDepartmentsParamAction, loadWaitingDepartmentsAction } from '../../store/actions/personal/waiting.action';

class Index extends React.Component {
  handleSearch = async (value) => {
    const store = this.props
    await store.dispatch(updateWaitingDepartmentsParamAction(value))
    await store.dispatch(loadWaitingDepartmentsAction())
  }

  handleClick = (code) => {
    const { router } = this.props
    router.push(`/personal/waitingdetail?hosOrgCode=${router.query.hosOrgCode}&hosDeptCode=${code}`, `/personal/waitingdetail/${router.query.hosOrgCode}/${code}`)
  }

  render() {
    const { waitingReducer } = this.props
    const { departmentParam, waitingDepartments } = waitingReducer
    return (
      <div>
        <SearchBar 
          placeholder='请输入科室名称进行搜索' 
          value={departmentParam}
          onChange={this.handleSearch}
          maxLength={20} 
        />
        <List>
          { 
            waitingDepartments && checkNotNullArr(waitingDepartments) && waitingDepartments.map((obj, i) => (
              <List.Item key={i} onClick={this.handleClick.bind(this, obj.deptCode)}>{obj.deptName}</List.Item>
            ))
          }
        </List>
      </div>
    )
  }
}

export default withRouter(connect(state => state)(Index))