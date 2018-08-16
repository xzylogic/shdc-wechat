import React from 'react'
import { connect } from 'react-redux'

import UserCard from './UserCard'

import { updateWaitingMineParamAction } from '../../store/actions/personal/waiting.action'

class Index extends React.Component {
  handleChange = (value) => {
    const store = this.props
    store.dispatch(updateWaitingMineParamAction(value[0]))
  }
  render() {
    const { waitingReducer } = this.props
    const { waitingMineParam } = waitingReducer
    return (
      <React.Fragment>
        <UserCard ifKey value={waitingMineParam} onChange={this.handleChange} />
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)