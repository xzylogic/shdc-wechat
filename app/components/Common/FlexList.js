import React from 'react'

import './flexlist.scss'

export class FlexItem extends React.Component {
  render() {
    const { sub, extra, children, widthSub = '100px', widthExtra = '15px', ...rest } = this.props
    return (
      <div className='flex__container' {...rest}>
        <div className='flex__main'>
          <div style={{margin: `0 ${widthExtra} 0 ${widthSub}`}}>
            {children}
          </div>
        </div>
        <div className='flex__sub' style={{marginLeft: '-100%', width: widthSub}}>
          {sub}
        </div>
        <div className='flex__extra' style={{marginLeft: `-${widthExtra}`, width: widthExtra}}>
          {extra}
        </div>
      </div>
    )
  }
}

export class ImgContainer extends React.Component {
  render() {
    const { className, style, src } = this.props
    return (
      <div className={`img__container ${className || ''}`} style={style}>
        <img src={src} />
      </div>
    )
  }
}

export class MainContainer extends React.Component {
  render() {
    const { children, ...rest } = this.props
    return (
      <div className='main__container' {...rest}>
        {children}
      </div>
    )
  }
}

export const SubContent = ({title, icon}) => (
  <MainContainer className='user__ownlist'>
    <p><i className={`anticon icon-${icon} user__tipicon`} />{title}</p>
  </MainContainer>
)
