import React, { PureComponent } from 'react'
import { DatePicker, List } from 'antd-mobile'

class MyDatePicker extends PureComponent {
  render() {
    let { ...rest } = this.props
    return (
      <React.Fragment>
        <DatePicker
          {...rest}
          mode='date'
          minDate={new Date(`${new Date().getFullYear() - 120}-01-01`)}
          maxDate={new Date()}
        >
          <List.Item arrow='horizontal'><i className='anticon icon-gift login__icon' />生日</List.Item>
        </DatePicker>
      </React.Fragment>
    )
  }
}

export default MyDatePicker
