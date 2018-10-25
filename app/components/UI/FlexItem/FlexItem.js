import React from 'react'

import classes from './FlexItem.scss'

const flexItem = (props) => {
  const containerClass = [classes.FlexItem];
  if (props.containerClass) {
    containerClass.push(props.containerClass)
  }
  return (
    <div className={containerClass.join(' ')} onClick={props.onClick}>
      <div className={classes.MainContainer}>
        <div
          className={classes.MainContent}
          style={{padding: `0px ${props.extraWidth} 0px ${props.subWidth}`}}>
          {props.children}
        </div>
      </div>
      <div 
        className={classes.SubContainer}
        style={{width: props.subWidth}}>
        {props.subContent}
      </div>
      <div 
        className={classes.ExtraContainer}
        style={{width: props.extraWidth}}>
        {props.ExtraContent}
      </div>
    </div>
  )
}

export default flexItem
