import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import EntranceComponent from '../../app/components/Appointment/EntranceComponent'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
    return { hosOrgCode: query.hosOrgCode }
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(updateCurrent(`/appointment/entrance/${query.hosOrgCode}`))
  }

  render() {
    const { hosOrgCode } = this.props
    console.log(hosOrgCode)
    return (
      <div>
        <Head title='进入门诊' />
        <EntranceComponent params={hosOrgCode} />
      </div>
    )
  }
}

export default connect(state => state)(Index)
