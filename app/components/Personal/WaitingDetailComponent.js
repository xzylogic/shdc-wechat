import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {
  render() {
    const { waitingReducer } = this.props
    const { waitingContent } = waitingReducer
    let detail = waitingContent.replace(/(.*)<base(.*)/, '$1<meta$2')
    return (
      <React.Fragment>
        <div dangerouslySetInnerHTML={{__html: detail}} style={{padding: '15px', background: '#fff'}} />
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)