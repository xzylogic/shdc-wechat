import React from 'react'

import classes from './Tabs.scss'

export const Tab =({title, children, style}) => (<div className={classes.TabContent}>{children}</div>)

export class Tabs extends React.Component {
  state = {
    currentIndex: 0
  }

  handleTabClick = (event, index) => {
    if (this.props.handleTabClick) {
      this.props.handleTabClick(event, index)
    } else {
      this.setState({
        currentIndex: index
      })
    }
  }

  render() {
    const children = this.props.children || []
    const currentIndex = this.props.index || this.state.currentIndex || 0
    let tabsTitlesClass = classes.TabsTitlesHorizontal
    let tabsContentClass = classes.TabsContentHorizontal
    if (this.props.mode === 'vertical') {
      tabsTitlesClass = classes.TabsTitlesVertical
      tabsContentClass = classes.TabsContnetVertical
    }
  
    const tabsTitles = React.Children.map(children, (element, index) => {
      let titlesClass = [classes.Title]
      if (currentIndex === index) {
        titlesClass.push(classes.Active)
      }
      return (
        <div 
          className={titlesClass.join(' ')} 
          onClick={(event) => this.handleTabClick(event, index)}>
          {element.props.title}
        </div>
      )
    })

    const tabsContent = React.Children.map(children, (element, index) => {
      return currentIndex === index ? element : ''
    })

    return (
      <div className={classes.TabsContainer} style={this.props.containerStyle || {}}>
        <div className={tabsTitlesClass} style={this.props.titlesClass}>
          {tabsTitles}
        </div>
        <div className={tabsContentClass} style={this.props.contentStyle || {}}>
          {tabsContent}
        </div>
      </div>
    )
  }
}

Tabs.Tab = Tab

export default Tabs
