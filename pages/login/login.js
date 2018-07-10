import React from 'react'
import { connect } from 'react-redux'

import LoginComponent from '../../app/components/Login/LoginComponent'

import { initGlobalQuery } from '../../app/utilities/common';

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  render() {
    return (
      <div>
        <LoginComponent />
      </div>
    )
  }
}

export default connect(state => state)(Index)
