import React from 'react'

import { FlexList, MainContainer, SubContent, FlexListConfigEntity } from '../Common/FlexList'

import './personal.scss'

class Index extends React.Component {

  render() {
    const configList = new FlexListConfigEntity({
      leftWidth: '20px',
      rightWidth: 0, 
      minHeight: '30px',
      withBorder: 'href'
    })
    return (
      <div>
        <FlexList 
          sub={<SubContent title='' icon='user' />}
          extra={<i className='anticon icon-right user__arraw' />}
          config={configList}>
          <MainContainer mainClass='user__ownlist'>
            <p>【社保卡】石青（尾号1083）</p>
          </MainContainer>
        </FlexList>
      </div>
    )
  }
}

export default Index
