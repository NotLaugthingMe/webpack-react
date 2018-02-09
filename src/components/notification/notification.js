/**
 * Created by chenlin on 2018/2/9 0009.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Notice from './notice';

let speed = 0;
let now = Date.now();
const getUid = function() {
  return `notification_${now}_${speed++}`;
};
class Notification extends React.Component{
  state = {
    notices: []
  };
  add=(notice)=>{
    const key = notice.key || getUid();
    let {notices} = this.state;
    const has = notices.filter(n=>{
      return n.keys === key;
    });
    if (!has.length) {
      notices = notices.concat(notice);
    }
    this.setState({
      notices
    });
  };
  remove=(key)=>{
    const {notices} = this.state;
    const has = notices.filter(n=>{
      return n.key !== key;
    });
    this.setState({
      notices: has
    });
  };
  removeAll=()=>{
    this.setState({
      notices: []
    });
  };
  render() {
    const {...others} = this.props;
    const {notices} = this.state;
    return (
      <div {...others}>
        {
          notices.map((notice, idx)=>{
            const {className, content} = notice;
            return <Notice key={idx} className={className}>{content}</Notice>;
          })
        }
      </div>
    );
  }
}
const newInstance = function(properties) {
  return new Promise(resolve=>{
    const {getContainer, ...props} = properties || {};
    let div;
    if (getContainer) {
      div = getContainer();
    } else {
      div = document.createElement('div');
      document.body.appendChild(div);
    }
    function ref(notification) {
      resolve({
        addNotice(noticeProps) {
          notification.add(noticeProps);
        },
        removeNotice(key) {
          notification.remove(key);
        },
        removeAll() {
          notification.removeAll();
        },
        component: notification,
        close() {
          const status = ReactDOM.unmountComponentAtNode(div);
          if (status)document.body.removeChild(div);
        }
      });
    }
    ReactDOM.render(<Notification ref={ref} {...props}/>, div);
  });
};
export default newInstance;
