import React from 'react'

import './tabs.scss'

export const Tab =({title, children}) => (<div className='tab__content'>{children}</div>)

export class Tabs extends React.Component {
  state = {
    currentIndex: 0
  }


  getTabTitleClass = (index) => {
    let currentIndex = this.props.index || this.state.currentIndex || 0
    return currentIndex === index ? 'title active' : 'title'
  }

  handleTabClick = (index) => {
    if (this.props.handleTabClick) {
      this.props.handleTabClick(index)
    } else {
      this.setState({
        currentIndex: index
      })
    }
  }

  render() {
    const children = this.props.children || []
    return (
      <div className={this.props.containerClass || 'tabs__container'} style={this.props.style || {}}>
        <div className={this.props.titlesClass || 'tabs__titles'}>
          {
            React.Children.map(children, (element, index) => {
              return (
                <div className={this.getTabTitleClass(index)} onClick={this.handleTabClick.bind(this, index)}>
                  {element.props.title}
                </div>
              )
            })
          }
        </div>
        <div className={this.props.contentClass || 'tabs__content'} style={this.props.contentStyle || {}}>
          {
            React.Children.map(this.props.children, (element, index) => {
              let currentIndex = this.props.index || this.state.currentIndex || 0 
              return currentIndex === index ? element : ''
            })
          }
        </div>
      </div>
    )
  }
}