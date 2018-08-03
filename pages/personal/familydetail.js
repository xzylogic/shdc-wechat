import React from 'react'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import FamilyDetailComponent from '../../app/components/Personal/FamilyDetailComponent'

import { initGlobalQuery, recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    initGlobalQuery(store, query)
  }

  componentDidMount() {
    const store = this.props
    recordCurrentPage(store, `/personal/familydetail`)
  }

  render() {
    return (
      <div>
        <Head title='家庭成员详情' />
        <RenderPage>
          <FamilyDetailComponent />
        </RenderPage>
      </div>
    )
  }
}

export default withAuth(Index)
