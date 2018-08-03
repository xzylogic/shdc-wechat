import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import * as CODE from './status-code'

export default function withAuth(AuthComponent) {

  class Authenticated extends Component {
    componentDidMount () {
      const { globalReducer } = this.props
      const { router } = this.props
      if (globalReducer && CODE.NOT_LOGIN === globalReducer.code) {
        router.replace('/login')
      }
    }

    render() {
      const store = this.props
      console.log(store)
      return (
        <div>
          <AuthComponent {...this.props} />
        </div>
      )
    }    
  }
  return connect(state => state)(withRouter(Authenticated))
}