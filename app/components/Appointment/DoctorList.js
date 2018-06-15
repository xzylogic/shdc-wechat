import React from 'react'
import { Button } from 'antd-mobile';

const renderList = ({img, name, title, des}, index) => {
  return (
    <div key={index} className='mylist'>
      <div className='list__main'>
        <div className='list__content'>
          <div className='doctor__desc'>
            <p className='title'>{name} {title}</p>
            <p className='desc'>{des}</p>
          </div>
        </div>
      </div>
      <div className='list__left'>
        <div className='doctor__avatar'>
          <img src={img} />
        </div>
      </div>
    </div>
  )
}

class Index extends React.Component {
  render() {
    const data = [{
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      name: '赴远方',
      title: '副主任医师',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    }]
    return (
      <div>{
        data.map((obj, index) => renderList(obj, index))
      }</div>
    )
  }
}

export default Index
