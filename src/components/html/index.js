/**
 * Created by chenlin on 2018/2/27 0027.
 */
import React from 'react';

export default class Html extends React.Component{
  render() {
    const {component, children, ...others} = this.props;
    const Component = component || 'p';
    return (
      <Component dangerouslySetInnerHTML={children} {...others}>
      </Component>
    );
  }
}
