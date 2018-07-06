import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import RenderPage from '../../app/components/Common/RenderPage'
import FamilyAddComponent from '../../app/components/Personal/FamilyAddComponent'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'
import { HttpToastService } from '../../app/utilities/httpService/index'

const PATH = {
  cardAdd: '/api/user/card/add'
}

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(updateCurrent(`/personal/appointment`))
  }

  handleSubmit = (value) => {
    const { globalReducer } = this.props
    const formData = {
      cardId: value.cardId,
      cardType: value.cardType[0],
      medicineCardId: value.medicineCardId,
      medicineCardType: value.medicineCardType[0],
      mobile: value.mobile,
      name: value.name,
      sex: value.sex[0]
    }
    HttpToastService.post(`${PATH.cardAdd}`, formData, {headers: {'access-token': globalReducer.accessToken}}).then(res => {
      console.log(res)
      if(res) {
        // store.dispatch(updateState({accessToken: res.accessToken}))
        Router.push(`/personal/mine`)
      }
    })
  }

  render() {
    return (
      <div>
        <Head title='添加家庭成员' />
        <RenderPage>
          <FamilyAddComponent handleSubmit={this.handleSubmit} />
        </RenderPage>
      </div>
    )
  }
}

export default connect(state => state)(Index)
