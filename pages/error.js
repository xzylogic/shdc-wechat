import React from 'react'
import { connect } from 'react-redux'

import Head from '../app/components/Common/Head'
import PageError from '../app/components/Common/PageError'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {query} = props.ctx
    return query
  }

  render() {
    const {error, url} = this.props
    return (
      <div>
        <Head title='出错啦～' />
        <PageError title={error} />
      </div>
    )
  }
}

export default connect(state => state)(Index)
