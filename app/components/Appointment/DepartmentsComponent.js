import React from 'react'

const TabTitle = ({tabs, style}) => (
  <div className={style}>{
    tabs.map(tab => <div>{tab.title}</div>)
  }</div>
)

const Tabs = ({tabs}) => (
  <TabTitle tabs={tabs} />
)

class Index extends React.Component {
  render() {
    const tabs = [
      { title: '耳鼻咽喉科室' },
      { title: '儿科' },
      { title: '儿童保健科' },
      { title: '口腔科' },
      { title: '皮肤科' },
    ]
    return (
      <div>
        123
      </div>
    )
  }
}

export default Index
