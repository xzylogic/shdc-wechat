import React from 'react'

import { FlexList, MainContainer, SubContent, FlexListConfigEntity } from '../Common/FlexList'

export const UserCard = () => {
  const configList = new FlexListConfigEntity({
    leftWidth: '20px',
    rightWidth: 0, 
    minHeight: '30px',
    withBorder: 'href'
  })
  return (
    <FlexList 
      sub={<SubContent title='' icon='user' />}
      extra={<i className='anticon icon-right user__arraw' />}
      config={configList}>
      <MainContainer mainClass='user__ownlist'>
        <p>【社保卡】石青（尾号1083）</p>
      </MainContainer>
    </FlexList>
  )
}