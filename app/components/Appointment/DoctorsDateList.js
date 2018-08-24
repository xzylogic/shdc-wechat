import React from 'react'
import { connect } from 'react-redux'

import { Tabs, Tab } from '../Common/Tabs'
import { NullList } from '../Common/Null'
import DoctorListByDate from './DoctorListByDate'
import { modifyDoctorsShow, loadScheduleAction } from '../../store/actions/appointment/doctors.action'
import { checkNotNullArr } from '../../utilities/common'

class Index extends React.Component {
  loadSchedules = (i, j, k, id) => {
    const store = this.props
    store.dispatch(loadScheduleAction(id, i, j, k))
  }

  modifyShow = (i, j) => {
    const store = this.props
    store.dispatch(modifyDoctorsShow(i, j))
  }

  render() {
    const { doctorsReducer } = this.props
    const { doctorsByDate } = doctorsReducer
    return (
      <div>
        <Tabs 
          containerClass='tabs__container-common' 
          contentClass='tabs__content-common' 
          titlesClass='tabs__titles-common'
          contentStyle={{height: 'calc(100vh - 178px)'}}>
          {
            checkNotNullArr(doctorsByDate) ? doctorsByDate.map((data, i) =>
              <Tab key={i} title={`${data.date}（${data.weekDays}）`}>
                <DoctorListByDate 
                  doctors={data.doctors} 
                  loadSchedules={this.loadSchedules.bind(this, i)}
                  modifyShow={this.modifyShow.bind(this, i)}
                />
              </Tab>
            ) : <NullList />
          }
        </Tabs>
      </div>
    )
  }
}

export default connect(state => state)(Index)
