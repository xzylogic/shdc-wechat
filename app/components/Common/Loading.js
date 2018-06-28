import React from 'react'
import './loading.scss'

export default class extends React.Component {
  render() {
    return (
      <div className='loading-center'>
        <span className='throbber-loader'>Loading…</span>
      </div>
    )
  }
}
