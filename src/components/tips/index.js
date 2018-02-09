/**
 * Created by chenlin on 2018/2/9 0009.
 */
import './index.scss';
import React from 'react';
import Notification from '../notification/notification';
import Mask from '../mask/index';

let speed = 0;
let now = Date.now();
let getUid = function() {
  return `tips_${now}_${speed++}`;
};
let notification = null;
let timer = null;
const closeTips = function() {
  timer && clearTimeout(timer);
  if (notification) {
    notification.close();
    notification = null;
  }
};
class Tips extends React.Component{
  handleClick=()=>{
    closeTips();
  };
  render() {
    const {text} = this.props;
    return (
      <div>
        <Mask transparent={true} onClick={this.handleClick}/>
        <div className="tips_box">
          <div className="tips"><p>{text}</p></div>
        </div>
      </div>
    );
  }
}
const tips = async function(text, delay = 3000) {
  closeTips();
  const key = getUid();
  notification = await Notification();
  notification.addNotice({
    content: <Tips text={text}/>,
    className: 'react-tips',
    key
  });
  timer = setTimeout(()=>{
    notification.close();
  }, delay);
};
export default tips;
