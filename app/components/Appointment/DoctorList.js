import React from 'react'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

const renderList = ({img, name, title, des}, index) => {
  const config = new FlexListConfigEntity({
    leftWidth: '100px',
    rightWidth: '15px', 
    minHeight: '80px',
    withBorder: 'href'
  })

  return (
    <FlexList
      sub={<ImageContainer imageUrl={img} />}
      config={config} key={index}>
      <MainContainer mainClass='doctor__desc'>
        <p className='title'>{name} {title}</p>
        <p className='desc'>{des}</p>
      </MainContainer>
    </FlexList>
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
