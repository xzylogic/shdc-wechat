import React from 'react'
import Link from 'next/link'
import { WhiteSpace, WingBlank, Button } from 'antd-mobile'

import './login.scss'
 
class Index extends React.Component {
  render() {
    return (
      <div className='full__container'>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WingBlank size='lg' style={{lineHeight: '1.75', fontSize: '16px'}}>
          <p>新密码已通过短信发至您注册的手机号码，请注意查收。登录后您可进入用户详情页面进行密码修改操作。</p>
        </WingBlank>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <Link href='/login'>
            <Button type='primary'>返回登录</Button>
          </Link>
        </WingBlank>
        <WhiteSpace size='lg' />
      </div>
    )
  }
}

export default Index
