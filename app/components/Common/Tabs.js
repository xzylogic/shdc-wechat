import React from 'react'

import './tabs.scss'

export const Tab =({title, children}) => (<div className='tab__content'>{children}</div>)

export class Tabs extends React.Component {
  state = {
    currentIndex: this.props.index || 0
  }

  getTabTitleClass = (index) => {
    return this.state.currentIndex === index ? 'title active' : 'title'
  }

  render() {
    return (
      <div className={this.props.containerClass || 'tabs__container'}>
        <div className={this.props.titlesClass || 'tabs__titles'}>
          {
            React.Children.map(this.props.children, (element, index) => {
              return (
                <div className={this.getTabTitleClass(index)} onClick={() => this.setState({currentIndex: index})}>
                  {element.props.title}
                </div>
              )
            })
          }
        </div>
        <div className={this.props.contentClass || 'tabs__content'}>
          {
            React.Children.map(this.props.children, (element, index) => {
              return this.state.currentIndex === index ? element : ''
            })
          }
        </div>
      </div>
    )
  }
}