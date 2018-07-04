import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import FamilyAddComponent from '../../app/components/Personal/FamilyAddComponent'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(updateCurrent(`/personal/appointment`))
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
