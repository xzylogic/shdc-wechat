import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import { NullContent } from '../../app/components/Common/Null'

class Index extends React.Component {
  render() {
    return (
      <div>
        <Head title='电子健康卡' />
        <NullContent msg='敬请期待' />
      </div>
    )
  }
}

export default connect(state => state)(Index)
