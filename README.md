# react-zoom-carousel

>

[![NPM](https://img.shields.io/npm/v/react-zoom-carousel.svg)](https://www.npmjs.com/package/react-zoom-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-zoom-carousel
```

## Usage

```jsx
import React, { Component } from 'react'

import ZoomGallery from 'react-zoom-carousel'

const zoomGallery = [
  'http://placehold.it/900x',
  'http://placehold.it/900x',
  'http://placehold.it/900x',
  'http://placehold.it/900x',
  'http://placehold.it/900x'
]
class Example extends Component {
  state = {
    open: true,
  }

  render () {
    return (
      <ZoomGallery
        open={this.state.open} // Conditionally show/hide the carousel
        handleClose={() => this.setState({ open: false })} // Called when close button is clicked
        images={zoomGallery} // Array of image urls
        initialIndex={0} // Index to start the slider from
      />
    )
  }
}
```

## License

MIT © [devil1991](https://github.com/devil1991)
