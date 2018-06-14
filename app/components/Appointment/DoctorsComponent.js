import React from 'react'
import { SearchBar, SegmentedControl, WingBlank, WhiteSpace } from 'antd-mobile'

class Index extends React.Component {
  render() {
    return (
      <div>
        <SearchBar placeholder='请输入医生姓名进行搜索' maxLength={8} />
        <WhiteSpace size='lg' />
        <WingBlank size='lg'>
          <SegmentedControl values={['按专家预约', '按日期预约']} style={{ height: '40px', margin: '0px 10% 0 10%' }} />
        </WingBlank>
      </div>
    )
  }
}

export default Index
