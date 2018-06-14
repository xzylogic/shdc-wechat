import React from 'react'
import Link from 'next/link'
import { SearchBar } from 'antd-mobile'

import { Tabs, Tab } from '../Common/Tabs'

import './appointment.scss'

class Index extends React.Component {
  render() {
    const tabs = [
      { title: '耳鼻咽喉科室', content: ['耳鼻咽喉科室', '儿科','耳鼻咽喉科室', '儿科','耳鼻咽喉科室', '儿科'] },
      { title: '儿科', content: ['儿科','耳鼻咽喉科室', '儿科','耳鼻咽喉科室', '儿科'] },
      { title: '儿童保健科', content: ['耳鼻咽喉科室','耳鼻咽喉科室', '儿科','耳鼻咽喉科室', '儿科'] },
      { title: '口腔科', content: ['儿科','耳鼻咽喉科室', '儿科','耳鼻咽喉科室', '儿科'] },
      { title: '皮肤科', content: ['耳鼻咽喉科室', '儿科','耳鼻咽喉科室', '儿科','耳鼻咽喉科室', '儿科'] },
    ]
    return (
      <div>
        <SearchBar placeholder='请输入子科室名称进行搜索' maxLength={8} />
        <Tabs>{
          tabs.map((tab,index) => <Tab title={tab.title} key={index}>{
            tab.content.map((content, index) => (
              <Link href='/appointment/detail' key={index}>
                <div className='department__content'>{content}</div>
              </Link>
            ))}</Tab>)
        }</Tabs>
      </div>
    )
  }
}

export default Index
