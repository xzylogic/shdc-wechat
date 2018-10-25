import React, { PureComponent } from 'react'

import classes from './ImageContainer.scss'

class ImageContainer extends PureComponent {
  state = {
    showImage: false
  }

  componentDidMount() {
    this.setState({
      showImage: true
    })
  }

  resetImage = (event) => {
    const width = event.target.width
    const height = event.target.height
    if (width > height) {
      event.target.style = "width:initial;height:100%"
    }
  }

  handleImageError = (event) => {
    let img = event.target
    img.src = this.props.defalutImage || '/static/images/avatar_hospital.png'
    img.onError = null
  }

  render() {
    return (
      <div className={classes.ImageContainer} style={this.props.containerStyle}>
      { 
        this.state.showImage ? <img
          src={this.props.src}
          onError={this.handleImageError}
          onLoad={this.resetImage} /> : ''
      }
      </div>
    )
  }
}

export default ImageContainer
