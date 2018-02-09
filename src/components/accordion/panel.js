/**
 * Created by chenlin on 2018/2/9 0009.
 */
import React from 'react';
export default class Panel extends React.Component{
  shouldComponentUpdate(nextProps) {
    return this.props.isActive || nextProps.isActive;
  };
  handleClick=()=>{
    this.props.toggle && this.props.toggle();
  };
  render() {
    const {children, header, isActive, ...others} = this.props;
    return (
      <div {...others}>
        <div className="panel-header" onClick={this.handleClick}>
          {header}
        </div>
        <div className="panel-body" style={{display: isActive ? 'block' : 'none'}}>
          <div className="panel-body-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

