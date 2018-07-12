import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import FamilyAddComponent from '../../app/components/Personal/FamilyAddComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'

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
        <RenderPage>
          <FamilyAddComponent />
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
