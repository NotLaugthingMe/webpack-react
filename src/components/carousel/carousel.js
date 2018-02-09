/**
 * Created by chenlin on 2018/2/8 0008.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import BScroll from 'better-scroll';
import './carousel.scss';
export default class Carousel extends React.Component{
  constructor() {
    super();
    this.myCarousel = null;
    this.timer = null;
    this.state = {
      currentPageIndex: 0
    };
  }
  static defaultProps = {
    loop: false,
    autoPlay: false,
    interval: 3000,
    threshold: 100,
    speed: 400
  };
  componentDidMount() {
    this.updateCarousel();
  }
  updateCarousel=()=>{
    if (this.myCarousel) {
      this.myCarousel.destroy();
    }
    this.init();
  };
  init=()=>{
    if (this.timer) clearInterval(this.timer);
    this.setState({
      currentPageIndex: 0
    }, ()=>{
      this.setCarouselWidth();
      this.initCarousel();
      if (this.props.autoPlay) {
        this.play();
      }
    });
  };
  setCarouselWidth=()=>{
    const container = ReactDOM.findDOMNode(this);
    const wrapper = container.getElementsByClassName('carousel-wrapper')[0];
    let items = container.getElementsByClassName('carousel-item');
    items = [].slice.call(items);
    const containerWidth = container.clientWidth;
    let width = 0;
    items.map(item=>{
      item.style.width = containerWidth + 'px';
      width += containerWidth;
    });
    if (this.props.loop) {
      width += 2 * containerWidth;
    }
    wrapper.style.width = width + 'px';
  };
  initCarousel=()=>{
    const container = ReactDOM.findDOMNode(this);
    this.myCarousel = new BScroll(container, {
      scrollX: true,
      scrollY: false,
      momentum: true,
      snap: {
        loop: this.props.loop,
        threshold: this.props.threshold,
        speed: this.props.speed
      },
      bounce: true
    });
    this.myCarousel.on('scrollEnd', this.ScrollEnd);
  };
  ScrollEnd=()=>{
    const currentPageIndex = this.myCarousel.getCurrentPage().pageX;
    this.setState({
      currentPageIndex
    }, ()=>{
      this.props.scrollEnd && this.props.scrollEnd();
    });
  };
  play=()=>{
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(()=>{
      this.myCarousel.next();
    }, this.props.interval);
  };
  prev=()=>{
    this.myCarousel.prev();
  };
  next=()=>{
    this.myCarousel.next();
  };
  render() {
    const {children} = this.props;
    return (
      <div className="carousel-container" ref="carousel-container">
        <div className="carousel-wrapper" ref="carousel-wrapper">
          {children}
        </div>
      </div>
    );
  }
}
