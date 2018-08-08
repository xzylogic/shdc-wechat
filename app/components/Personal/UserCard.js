import React from 'react'
import { connect } from 'react-redux'
import { Picker } from 'antd-mobile'

import '../Appointment/appointment.scss'

import { getCardList, checkNotNullArr } from '../../utilities/common'

const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', paddingLeft: 15 }}
  >
    <div style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
      <i className='anticon icon-user detail__icon' />
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '16px' }}>{props.extra}</div>
      <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>
        <i className='anticon icon-right' />
      </div>
    </div>
  </div>
)

class UserCard extends React.Component {

  render() {
    const store = this.props
    const ifKey = this.props.ifKey
    const { accountList } = store.accountReducer
    return (
      <div>
        {
          checkNotNullArr(accountList) && (
            <Picker 
              name='member'
              data={getCardList(accountList, ifKey)}
              value={this.props.value !== '' && [this.props.value]}
              onChange={this.props.onChange}
              cols={1}
              cascade={false}
            >
              <CustomChildren />
            </Picker>
          )
        }
      </div>
    )
  }
}

export default connect(state => state)(UserCard)
