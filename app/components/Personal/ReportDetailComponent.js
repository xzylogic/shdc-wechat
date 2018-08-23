import React from 'react'
import { connect } from 'react-redux'

import './reportdetail.scss'

class Index extends React.Component {
  render() {
    const { reportsReducer } = this.props
    const { reportDetail } = reportsReducer
    const detail = reportDetail.split('<body>')[1]
    return (
      <React.Fragment>
        <div dangerouslySetInnerHTML={{__html: detail}} style={{padding: '15px', background: '#fff'}} />
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)
