import React from 'react'
import Error from './Error'

class PageError extends React.Component {
  onButtonClick = () => {
    window.location.href = window.location.href.split('?')[0]
  }

  render() {
    return (
      <Error title={this.props.title} buttonText='重试' onButtonClick={this.onButtonClick} />
    )
  }
}

export default PageError
