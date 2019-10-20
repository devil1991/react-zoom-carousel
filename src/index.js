import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PinchToZoom from 'react-responsive-pinch-zoom-pan'
import styles from './styles.css'

export default class ZoomGallery extends Component {
  static propTypes = {
    images: PropTypes.array,
    initialIndex: PropTypes.number,
    open: PropTypes.bool,
    handleClose: PropTypes.func
  }

  static defaultProps = {
    initialIndex: 0,
    images: [],
    handleClose: () => null
  }

  constructor (props) {
    super(props)
    this.prevSlide = this.prevSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      currentIndex: props.initialIndex,
      loading: false
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      this.state.currentIndex !== prevState.currentIndex ||
      (this.props.open !== prevProps.open && this.props.open)
    ) return this.handleLoading()

    if (this.props.open && this.props.initialIndex !== prevProps.initialIndex) {
      this.setState({ currentIndex: this.props.initialIndex })
    }
  }

  prevSlide () {
    this.setState({ loading: true, currentIndex: this.state.currentIndex > 0 ? this.state.currentIndex - 1 : this.props.images.length - 1 })
  }

  nextSlide () {
    this.setState({ loading: true, currentIndex: (this.state.currentIndex < this.props.images.length - 1) ? this.state.currentIndex + 1 : 0 })
  }

  handleClose () {
    this.props.handleClose()
  }

  handleLoading () {
    const image = new Image()
    image.onload = () => {
      this.setState({ loading: false })
    }

    image.src = this.props.images[this.state.currentIndex]
  }

  render() {
    const {
      images = []
    } = this.props
    if (!this.props.open || images.length === 0) return null
    return (
      <div className={`${styles.wrapper} ZoomGalleryCarousel`}>
        <PinchToZoom initialScale='auto' position='center' zoomButtons={false}>
          <img className={`${styles.Image} ${this.state.loading ? styles.ImageLoading : ''}`} src={images[this.state.currentIndex]} />
        </PinchToZoom>
        { this.state.loading && <div className='spinner' /> }
        <div className={styles.close} onClick={this.handleClose}>
          <i className='icon icon-hogan-close-menu' />
        </div>
        <div className={styles.footer}>
          <span onClick={this.prevSlide} className={styles.action}><i className='icon-hogan-arrow-left icon' /></span>
          <span className='status'>{`${this.state.currentIndex + 1}/${images.length}`}</span>
          <span onClick={this.nextSlide} className={styles.action}><i className='icon-hogan-arrow-right icon' /></span>
        </div>
      </div>
    )
  }
}
