import React from 'react'
import Error from './Error'

class PageError extends React.Component {
  onButtonClick = () => {
    let redirectHref = window.location.href.split('?')[0]
    window.location.href = redirectHref
  }

  render() {
    return (
      <Error title={this.props.title} buttonText='重试' onButtonClick={this.onButtonClick} />
    )
  }
}

export default PageError
