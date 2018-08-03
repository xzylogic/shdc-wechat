import React from 'react'

import Head from '../../app/components/Common/Head'
import FamilyAddComponent from '../../app/components/Personal/FamilyAddComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/familyadd`)
  }

  render() {
    return (
      <div>
        <Head title='添加家庭成员' />
        <FamilyAddComponent />
      </div>
    )
  }
}

export default withAuth(Index)
