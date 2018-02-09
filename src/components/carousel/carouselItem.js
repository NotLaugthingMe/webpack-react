/**
 * Created by chenlin on 2018/2/8 0008.
 */

import React from 'react';
export default class CarouselItem extends React.Component{
  render() {
    const {children, ...others} = this.props;
    return (
      <div className="carousel-item" {...others}>
        {children}
      </div>
    );
  }
}
