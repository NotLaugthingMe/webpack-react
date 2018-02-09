/**
 * Created by chenlin on 2018/2/7 0007.
 */

import React from 'react';
import './index.scss';
export default class Index extends React.Component{
  componentDidMount() {
    console.log(1);
  };
  render() {
    return (
      <div className="index">
        我的世界
      </div>
    );
  }
}
