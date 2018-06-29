import React from 'react'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile'

import './error.scss'

class Error extends React.Component {
  render() {
    return (
      <div>
        <div className='error__container'>
          <i className='anticon icon-exclamationcircle error__icon' />
        </div>
        {
          this.props.title ? (<h3 className='error__title'>{this.props.title}</h3>) : ''
        } {
          this.props.message ? (<p className='error__message'>{this.props.message}</p>) : ''
        }
        <WingBlank>
          <WhiteSpace size='lg' />
          <WhiteSpace size='lg' />
          <Button type='primary' onClick={this.props.onButtonClick}>{this.props.buttonText}</Button>
          <WhiteSpace size='lg' />
        </WingBlank>
      </div>
    )
  }
}

export default Error
