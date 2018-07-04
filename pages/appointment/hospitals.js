import React from 'react'
import { connect } from 'react-redux'

import Head from '../../app/components/Common/Head'
import HospitalsComponent from '../../app/components/Appointment/HospitalsComponent'

import { updateState, updateCurrent } from '../../app/store/actions/global.action'
import { loadHospitals } from '../../app/store/actions/hospitals.action'

class Index extends React.Component {
  static async getInitialProps(props) {
    const {store, query} = props.ctx
    store.dispatch(updateState(query))
    store.dispatch(loadHospitals())
  }

  componentDidMount() {
    const store = this.props
    store.dispatch(updateCurrent('/appointment/hospitals'))
  }

  render() {
    const { hospitalsReducer } = this.props
    const { hospitalsAll, hospitalsZH, hospitalsZY, hospitalsZK } = hospitalsReducer
    return (
      <div>
        <Head title='预约就诊-医院列表' />
        <HospitalsComponent 
          hospitalsAll={hospitalsAll} 
          hospitalsZH={hospitalsZH} 
          hospitalsZY={hospitalsZY} 
          hospitalsZK={hospitalsZK} 
        />
      </div>
    )
  }
}

export default connect(state => state)(Index)
