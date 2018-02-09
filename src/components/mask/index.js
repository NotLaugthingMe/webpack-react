/**
 * Created by chenlin on 2018/2/8 0008.
 */
import React from 'react';
import classNames from 'classnames';
import './index.scss';
export default class Mask extends React.Component{
  static defaultProps = {
    transparent: false
  };
  render() {
    const {className, transparent, ...others} = this.props;
    const cls = classNames({
      'mask': !transparent,
      'mask_transparent': transparent
    }, className);
    return (
      <div className={cls} {...others}>
      </div>
    );
  }
}
