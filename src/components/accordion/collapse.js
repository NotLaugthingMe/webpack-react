/**
 * Created by chenlin on 2018/2/9 0009.
 */
import React from 'react';
import ClassNames from 'classnames';
export default class Collapse extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentKey: this.getActiveKey()
    };
  };
  static defaultProps = {
    accordion: false
  };
  getActiveKey=()=>{
    let activeKey = this.props.activeKey || [];
    const accordion = this.props.accordion;
    if (!Array.isArray(activeKey)) {
      activeKey = [activeKey];
    }
    if (accordion && activeKey.length > 1) {
      activeKey = [activeKey[0]];
    }
    for (let i = 0; i < activeKey.length; i++) {
      activeKey[i] = activeKey[i].toString();
    }
    return activeKey;
  };
  getItems=()=>{
    const {currentKey} = this.state;
    const {accordion} = this.props;
    const newChildren = [];
    React.Children.map(this.props.children, (child, idx)=>{
      const key = child.key || String(idx);
      const {header} = child.props;
      let isActive = false;
      if (accordion) {
        isActive = currentKey[0] === key;
      } else {
        isActive = currentKey.indexOf(key) > -1;
      }
      const props = {
        key,
        isActive,
        header,
        children: child.props.children,
        toggle: () => this.toggle(key)
      };
      newChildren.push(React.cloneElement(child, props));
    });
    return newChildren;
  };
  toggle=(key)=>{
    let {currentKey} = this.state;
    if (this.props.accordion) {
      currentKey = currentKey[0] === key ? [] : [key];
    } else {
      currentKey = [...currentKey];
      const index = currentKey.indexOf(key);
      const isActive = index > -1;
      if (isActive) {
        currentKey.splice(index, 1);
      } else {
        currentKey.push(key);
      }
    }
    this.setActiveKey(currentKey);
  };
  setActiveKey=(currentKey)=>{
    this.setState({ currentKey });
    this.props.onChange && this.props.onChange(this.props.accordion ? currentKey[0] : currentKey);
  };
  render() {
    const {className, ...others} = this.props;
    const cls = ClassNames({
      'collapse': true
    }, className);
    return (
      <div className={cls} {...others}>
        {this.getItems()}
      </div>
    );
  }
}
