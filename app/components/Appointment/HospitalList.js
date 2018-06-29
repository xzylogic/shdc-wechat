import React from 'react'

import { FlexList, ImageContainer, MainContainer, FlexListConfigEntity } from '../Common/FlexList'

class Index extends React.Component {
  render() {
    const hospitals = this.props.hospitals
    const config = new FlexListConfigEntity({
      leftWidth: '100px',
      rightWidth: '15px', 
      minHeight: '80px',
      withBorder: 'href'
    })
    return (
      <div>{
        hospitals.map((obj, index) => (
          <FlexList 
            key={index}
            sub={<ImageContainer imageUrl={`https://shdcapp.wondersgroup.com/mobilemedicalplatform${obj.hosImage}`} />}
            config={config}>
            <MainContainer mainClass='hospital__desc'>
              <p>{obj.hosName}</p>
              <p>地址：{obj.hospitalAdd} <i className='anticon icon-enviroment hospital__location' /></p>
            </MainContainer>
          </FlexList>
        ))
      }</div>
    )
  }
}

export default Index
