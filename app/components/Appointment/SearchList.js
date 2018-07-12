import React from 'react'
import Link from 'next/link'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

const renderList = (obj, index) => {
  const config = new FlexListConfigEntity({
    leftWidth: '100px',
    rightWidth: '15px', 
    minHeight: '80px',
    withBorder: 'href'
  })

  switch(obj.sign) {
    case '1': 
      return (
        <Link 
          key={index}
          href={`/appointment/entrance?hosOrgCode=${obj.hosOrgCode}`} 
          as={`/appointment/entrance/${obj.hosOrgCode}`}
        >
          <FlexList 
            sub={<ImageContainer imageUrl={`/static/images/avatar_hospital.png`} />}
            config={config}>
            <MainContainer mainClass='hospital__desc'>
              <p>{obj.hosName}</p>
              <p>医院等级：{obj.hospitalGrade}</p>
              <p>医院地址：{obj.hospitalAdd}</p>
            </MainContainer>
          </FlexList>
        </Link>
      )
    case '2': 
      return (
        <Link 
          key={index}
          href={`/appointment/entrance?hosOrgCode=${obj.hosOrgCode}`} 
          as={`/appointment/entrance/${obj.hosOrgCode}`}
        >
          <FlexList 
            sub={<ImageContainer imageUrl={`/static/images/avatar_department.png`} />}
            config={config}>
            <MainContainer mainClass='hospital__desc'>
              <p>{obj.deptName}</p>
              <p>医院名称：{obj.hosName}</p>
              <p>医院地址：{obj.hospitalAdd}</p>
            </MainContainer>
          </FlexList>
        </Link>
      )
    case '3': 
      return (
        <Link 
          key={index}
          href={`/appointment/entrance?hosOrgCode=${obj.hosOrgCode}`} 
          as={`/appointment/entrance/${obj.hosOrgCode}`}
        >
          <FlexList 
            sub={<ImageContainer imageUrl={`/static/images/avatar_doctor.png`} />}
            config={config}>
            <MainContainer mainClass='hospital__desc'>
              <p>{obj.doctName}</p>
              <p>医院名称：{obj.hosName}</p>
              <p>科室名称：{obj.deptName}</p>
              <p>医生特长：{obj.doctInfo}</p>
            </MainContainer>
          </FlexList>
        </Link>
      )
    default:
      return ''
  }
}

class Index extends React.Component {
  render() {
    const searchList = this.props.searchList
    
    return (
      <div>
        {Array.isArray(searchList) && searchList.map((obj, index) => renderList(obj, index) )}
      </div>
    )
  }
}

export default Index
