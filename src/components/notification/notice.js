/**
 * Created by chenlin on 2018/2/9 0009.
 */
import React from 'react';

export default class Notice extends React.Component{
  render() {
    const {children, className, ...others} = this.props;
    return (
      <div className={className}>
        <div {...others}>
          {children}
        </div>
      </div>
    );
  }
}
