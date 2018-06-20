import React from 'react'

import './flexlist.scss'

const FlexListConfigInitial = {
  leftWidth: '100px',
  rightWidth: 0, 
  minHeight: '30px',
  withBorder: true
}

export class FlexListConfigEntity {
  constructor(obj = FlexListInitial) {
    this.leftWidth = obj.leftWidth
    this.rightWidth = obj.rightWidth
    this.minHeight = obj.minHeight
    this.withBorder = obj.withBorder
  }
}

export const FlexList = ({children, sub, extra, config, onClick}) => {
  const getFlexClass = () => {
    switch(config.withBorder) {
      case 'border':
        return 'flex__list flex__list__border'
      case 'dash':
        return 'flex__list flex__list__dash'
      case 'href':
        return 'flex__list flex__list__href'
      default:
       return 'flex__list'
    }
  }
  return (
    <div onClick={onClick} className={getFlexClass()} style={{minHeight: config.minHeight}}>
      <div className='list__main'>
        <div style={{margin: `0 ${config.rightWidth} 0 ${config.leftWidth}`}}>
          {children}
        </div>
      </div>  
      <div className='list__left' style={{marginLeft: '-100%', width: config.leftWidth}}>
        {sub}
      </div>  
      <div className='list__right' style={{marginLeft: `-${config.rightWidth}`, width: config.rightWidth}}>
        {extra}
      </div>  
    </div>
  )
}

export const ImageContainer = ({imageUrl, containerPadding = '15px', imageClass}) => (
  <div className='image__container' style={{padding: containerPadding}}>
    <img src={imageUrl} className={imageClass} />
  </div>
)

export const MainContainer = ({children, mainClass}) => (
  <div className={mainClass}>
    {children}
  </div>
)
