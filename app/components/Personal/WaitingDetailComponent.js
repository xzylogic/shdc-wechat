import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {
  render() {
    const { waitingReducer } = this.props
    const { waitingContent } = waitingReducer
    return (
      <React.Fragment>
        <div dangerouslySetInnerHTML={{__html: waitingContent}} style={{padding: '15px', background: '#fff'}} />
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)