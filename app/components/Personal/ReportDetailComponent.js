import React from 'react'
import { connect } from 'react-redux'

import './reportdetail.scss'

class Index extends React.Component {
  render() {
    const { reportsReducer } = this.props
    const { reportDetail } = reportsReducer
    return (
      <React.Fragment>
        <div dangerouslySetInnerHTML={{__html: reportDetail}} style={{padding: '15px', background: '#fff'}} />
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)
