/**
 * Created by chenlin on 2018/2/9 0009.
 */
import React from 'react';
import ClassNames from 'classnames';
import Notification from '../notification/notification';
import Mask from '../mask/index';
import './index.scss';
let speed = 0;
let now = Date.now();
let getUid = function() {
  return `alert_${now}_${speed++}`;
};
let alertInstance = null;
function alertClose() {
  if (alertInstance) {
    alertInstance.close();
    alertInstance = null;
  }
}
class Button extends React.Component{
  static defaultProps = {
    type: 'default' // primary
  };
  render() {
    const {className, type, children, ...others} = this.props;
    const C = this.props.href ? 'a' : 'button';
    const cls = ClassNames({
      'dialog__btn': true,
      [`dialog__btn_${type}`]: true
    }, className);
    return (
      <C className={cls} {...others}>{children}</C>
    );
  }
}
class Alert extends React.Component{
  static defaultProps = {
    title: '温馨提示',
    btns: [
      {
        'text': '取消',
        'type': 'default'
      },
      {
        'text': '确定',
        'type': 'primary'
      }
    ],
    data: ''
  };
  handleTap=(idx)=>{
    if (this.props.onTap) {
      this.props.onTap(idx, this.props.data, alertInstance);
    }
  };
  handleClose=()=>{
    if (this.props.onClose) {
      this.props.onClose(0, this.props.data, alertInstance);
    } else {
      alertClose();
    }
  };
  render() {
    const {title, onClose, children, show, btns} = this.props;
    if (!show) return null;
    return (
      <div key="alert">
        <Mask transparent={false} onClick={this.handleClose}/>
        <div className="dialog">
          <div className="dialog__hd">
            <strong className="dialog__title">{title}</strong>
            {onClose ? <a href="javascript:void (0)" className="dialog__close" onClick={this.handleClose} >
            </a> : null}
          </div>
          <div className="dialog__bd">{children}</div>
          <div className="dialog__ft">
            {
              btns.map((btn, idx)=>{
                const {text, type} = btn;
                return <Button onClick={this.handleTap.bind(this, idx)} href="javascript:void (0)" key={idx} type={type}>{text}</Button>;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
const alert = async function(properties) {
  alertClose();
  const key = getUid();
  alertInstance = await Notification();
  alertInstance.addNotice({
    content: <Alert {...properties} show={true}/>,
    className: 'react-alert',
    key
  });
  return {
    close() {
      alertClose();
    }
  };
};
export {alert, alertClose};

