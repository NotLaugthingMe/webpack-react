/**
 * Created by chenlin on 2018/2/7 0007.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import BScroll from 'better-scroll';
import {getOffset} from 'utils/dom/index';
import './dropload.scss';
export default class Swiper extends React.Component{
  static defaultProps = {
    bottom: 0,
    scrollX: false,
    scrollY: true,
    probeType: 3,
    isNeedPullUp: false,
    threshold: 30
  };
  state = {
    isPullingUp: false,
    loadIndex: 0
  };
  componentDidUpdate() {
    this.refresh();
  }
  returnLoad=()=>{
    const item = [
      [<div key={0} className='dropload-refresh'>↑上拉加载更多</div>],
      [<div key={1} className='dropload-load'><span className="loading"></span>加载中...</div>],
      [<div key={2} className='dropload-noData'>我是有底线的</div>]
    ];
    return item[this.state.loadIndex];
  };
  componentDidMount() {
    this.init();
  }
  init=()=>{
    if (this.mySwiper) {
      this.mySwiper.destroy();
    }
    this.initHeight();
    this.initSwiper();
  };
  initHeight=()=>{
    const elem = ReactDOM.findDOMNode(this);
    const wrapper = elem.firstElementChild;
    if (!elem && !wrapper) return false;
    const offset = getOffset(elem);
    const offsetTop = offset.top;
    const windowHeight = document.documentElement.clientHeight;
    const height = windowHeight - offsetTop - this.props.bottom;
    elem.style.height = height + 'px';
    wrapper.style.minHeight = height + 1 + 'px';
  };
  initSwiper=()=>{
    const {scrollX, scrollY, probeType, isNeedPullUp} = this.props;
    const elem = ReactDOM.findDOMNode(this);
    this.mySwiper = new BScroll(elem, {
      scrollX: scrollX,
      scrollY: scrollY,
      probeType: probeType,
      bounce: true,
      bounceTime: 500,
      momentum: true
    });
    if (isNeedPullUp) {
      this.mySwiper && this.mySwiper.on('scroll', pro=> {
        this.onScroll(pro);
      });
    }
    this.mySwiper && this.mySwiper.on('scrollEnd', ()=>{
      this.onScrollEnd();
    });
  };
  onScroll=(pro)=>{
    const {isPullingUp, loadIndex} = this.state;
    if (isPullingUp) return false;
    if (loadIndex === 0) {
      const {y} = pro;
      if (y < 0 && Math.abs(y) > this.props.threshold) {
        this.setState({
          isPullingUp: true,
          loadIndex: 1
        }, ()=>{
          this.props.loadMore && this.props.loadMore();
        });
      }
    }
  };
  onScrollEnd=()=>{
    this.setState({
      isPullingUp: false
    }, ()=>{
      this.refresh();
    });
  };
  refresh=()=>{
    this.mySwiper && this.mySwiper.refresh();
  };
  render() {
    const {children, isNeedPullUp} = this.props;
    return (
      <div className="swiper-container" ref="mySwiper">
        <div className="swiper-wrapper">
          <div className="swiper-content">
            {
              isNeedPullUp ? <div>{children}<div className="dropload-down" ref="dropload">
                {this.returnLoad()}</div></div> : children
            }
          </div>
        </div>
      </div>
    );
  };
}
