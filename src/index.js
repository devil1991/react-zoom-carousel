import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PinchView from 'react-responsive-pinch-zoom-pan'
import styles from './styles.css'
const bodyScrollLock = require('body-scroll-lock')
const disableBodyScroll = bodyScrollLock.disableBodyScroll
const clearAllBodyScrollLocks = bodyScrollLock.clearAllBodyScrollLocks

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

  zoomer = React.createRef()

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
    if (this.zoomer && this.zoomer.current) {
      try {
        if (this.state.currentIndex !== prevState.currentIndex) {
          this.zoomer.current.applyInitialTransform()
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (this.props.open && !prevProps.open) {
      this.setState({ currentIndex: this.props.initialIndex })
    }

    if (this.props.open) {
      disableBodyScroll()
    } else {
      clearAllBodyScrollLocks()
    }

    if (
      this.state.currentIndex !== prevState.currentIndex ||
      (this.props.open !== prevProps.open && this.props.open)
    ) return this.handleLoading()
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
    if (this.props.open) {
      document.documentElement.classList.add('zoom-open')
    } else {
      document.documentElement.classList.remove('zoom-open')
    }

    return (
      <div className={`${styles.wrapper} ZoomGalleryCarousel`}>
        <PinchView ref={this.zoomer} initialScale='auto' position='center' zoomButtons={false} maxScale={4}>
          <img className={`${styles.Image} ${this.state.loading ? styles.ImageLoading : ''}`} src={images[this.state.currentIndex]} />
        </PinchView>
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
