import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { initGlobalQuery } from './common'

export default function withAuth(AuthComponent, InitFunction) {

  class Authenticated extends Component {
    static async getInitialProps(props) {
      const { store, query } = props.ctx
      initGlobalQuery(store, query).then(flag => {
        if (flag && typeof InitFunction !== 'undefined') {
          InitFunction(store)
        }
      })
    }

    componentDidUpdate () {
      const { globalReducer, router } = this.props
      if (globalReducer && false === globalReducer.authState) {
        router.replace('/login')
      }
    }

    render() {
      const store = this.props
      return (
        <div>
          <AuthComponent {...this.props} />
        </div>
      )
    }    
  }

  return connect(state => state)(withRouter(Authenticated))

}