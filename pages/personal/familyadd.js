import React from 'react'

import Head from '../../app/components/Common/Head'
import FamilyAddComponent from '../../app/components/Personal/FamilyAddComponent'

import { recordCurrentPage } from '../../app/utilities/common'
import withAuth from '../../app/utilities/withAuth'

class Index extends React.Component {

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
