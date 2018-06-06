/**
 * Created by chenlin on 2018/2/7 0007.
 */

import React from 'react';
import './index.scss';
import Swiper from 'components/swiper/swiper';
export default class Index extends React.Component{
  componentDidMount() {
  };
  render() {
    return (
      <div className="index">
        <Swiper>
          <p> 我的世界</p>
        </Swiper>
      </div>
    );
  }
}
