import React from 'react'

export class NullList extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center', padding: '15px'}}>空空如也</div>
    )
  }
}

export class NullContent extends React.Component {
  render() {
    const msg = this.props.msg
    return (
      <div style={{textAlign: 'center', padding: '15px', color: '#999'}}>{msg}</div>
    )
  }
}

export class NullImageContent extends React.Component {
  render() {
    const msg = this.props.msg
    const image = this.props.image
    return (
      <div style={{textAlign: 'center', padding: '15px', color: '#999'}}>
        <img src={image} style={{width: '10%', height: '10%'}} />
        {msg}
      </div>
    )
  }
}
