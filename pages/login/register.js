import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import * as moment from 'moment'
  
import Head from '../../app/components/Common/Head'
import RegisterComponent from '../../app/components/Login/RegisterComponent'

import { updateState, getCurrent } from '../../app/store/actions/global.action'
import { HttpHostService } from '../../app/utilities/httpService'

const PATH = {
  register: '/api/register'
}

class RegisterPage extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(getCurrent())
  }

  handleRegister = (value) => {
    const store = this.props
    console.log(value)
    console.log(store.globalReducer.weChatId)
    console.log(store.globalReducer.currentPage)
    const formData = {
      address: value.address,
      birthday: moment(value.birthday).format('YYYY-MM-DD'),
      cardId: value.cardId,
      cardType: value.cardType[0],
      mobile: value.mobile,
      origin: 'wx',
      password: value.password,
      sex: value.sex[0],
      username: value.username,
      wechatId: store.globalReducer.weChatId
    }
    HttpHostService.post(`${PATH.register}`, formData).then(res => {
      console.log(res)
      if(res) {
        store.dispatch(updateState({accessToken: res.accessToken}))
        Router.push(store.globalReducer.currentPage)
      }
    })
  }

  render() {
    return (
      <div>
        <Head title='注册账号' />
        <RegisterComponent handleRegister={this.handleRegister} />
      </div>
    )
  }
}

export default connect(state => state)(RegisterPage)
