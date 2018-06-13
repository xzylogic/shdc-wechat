import React from 'react'
import Link from 'next/link'
import { List, InputItem, WingBlank, WhiteSpace, Button, Picker, DatePicker, TextareaItem } from 'antd-mobile'

import './login.scss'

class Index extends React.Component {
  render() {
    return (
      <div>
        <List>
          <Picker 
            value={['身份证']}
            data={[[{label:'身份证',value:'身份证'},{label:'军官证',value:'军官证'},{label:'护照',value:'护照'},{label:'港澳通行证',value:'港澳通行证'}]]}
            cols={1}
            cascade={false}
          >
            <List.Item arrow='horizontal'><i className='anticon icon-creditcard login__icon' />证件类型</List.Item>
          </Picker>
          <InputItem 
            name='password'
            type='password'
            placeholder='请输入证件号（必填）'
            labelNumber={7}
          ><i className='anticon icon-creditcard login__icon' />证件号</InputItem>
          <InputItem
            name='username' 
            type='text' 
            placeholder='请输入用户名（必填）'
            labelNumber={7}
          ><i className='anticon icon-mobile1 login__icon' />手机号</InputItem>
        </List>
        <WhiteSpace size='xl' />
        <WingBlank size='lg'>
          <Button type='primary'>提交</Button>
        </WingBlank>
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default Index
