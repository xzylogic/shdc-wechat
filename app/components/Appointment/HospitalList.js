import React from 'react'
import { Button } from 'antd-mobile';

const renderList = ({hosImage, hosName, hospitalAdd}, index) => {
  return (
    <div key={index} className='mylist'>
      <div className='list__main'>
        <div className='list__content'>
          <div className='hospital__desc'>
            <p>{hosName}</p>
            <p>地址：{hospitalAdd} <i className='anticon icon-enviroment hospital__location' /></p>
          </div>
        </div>
      </div>
      <div className='list__left'>
        <div className='hospital__img'>
          <img src={`https://shdcapp.wondersgroup.com/mobilemedicalplatform${hosImage}`} />
        </div>
      </div>
    </div>
  )
}

class Index extends React.Component {
  render() {
    // console.log('HospitalList')
    const data = [{
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: '儿科医院儿科医院儿科医院儿科医院儿科医院儿科医院',
      des: '地址：不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: '儿童医学中心',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: '儿童医院（北京西路园区）',
      des: '地址：不是所有的兼职汪都需要风吹日晒',
    }]
    // console.log(data)
    const hospitals = this.props.hospitals
    return (
      <div>{
        hospitals.map((obj, index) => renderList(obj, index))
      }</div>
    )
  }
}

export default Index
