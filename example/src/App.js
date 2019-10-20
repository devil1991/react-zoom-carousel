import React, { Component } from 'react'
import ZoomGallery from 'react-zoom-carousel'

const images = [
  'https://hogan.bordel.studio/images/detail-product/1_800x1100.png',
  'https://hogan.bordel.studio/images/detail-product/2_800x1100.png',
  'https://hogan.bordel.studio/images/detail-product/3_800x1100.png',
  'https://hogan.bordel.studio/images/detail-product/4_800x1100.png',
  'https://hogan.bordel.studio/images/detail-product/5_800x1100.png'
]

export default class App extends Component {
  state = {
    open: false,
    initialIndex: 0
  }

  render () {
    return (
      <div>
        <ZoomGallery images={images} open={this.state.open} initialIndex={this.state.initialIndex} handleClose={() => this.setState({ open: false })} />
        <button onClick={() => this.setState({ open: true })}>Toggle Zoom</button>
      </div>
    )
  }
}
