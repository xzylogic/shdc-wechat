import React from 'react'
import {
  Button,
  WhiteSpace,
  WingBlank
} from 'antd-mobile'

class Error extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className='icon_container'>
          <i className='anticon icon-exclamationcircle icon_error' />
        </div>
        {
          this.props.title ? (<h3 className='error_title'>{this.props.title}</h3>) : ''
        } {
          this.props.message ? (<p className='error_message'>{this.props.message}</p>) : ''
        }
        <WingBlank>
          <WhiteSpace size='lg' />
          <WhiteSpace size='lg' />
          <Button type='primary' onClick={this.props.onButtonClick}>{this.props.buttonText}</Button>
          <WhiteSpace size='lg' />
        </WingBlank>
        <style jsx>{`
          .icon_container {
            padding: 50px 0 30px 0;
            text-align: center;
          }
          .icon_error {
            font-size: 88px;
            color: rgb(247,98,96);
          }
          .error_title {
            font-size: 16px;
            color: #333;
            text-align: center;
            line-height: 2; 
          }
          .error_message {
            font-size: 14px;
            color: #999;
            text-align: center;
            line-height: 2; 
          }
        `}</style>
      </div>
    )
  }
}

export default Error
