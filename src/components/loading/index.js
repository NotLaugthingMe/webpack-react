/**
 * Created by chenlin on 2018/2/9 0009.
 */

import React from 'react';
import Notification from '../notification/notification';
import Mask from '../mask/index';
import './index.scss';
let speed = 0;
let now = Date.now();
let getUid = function() {
  return `loading_${now}_${speed++}`;
};

let loadingInstance = null;
function loadingClose() {
  if (loadingInstance) {
    loadingInstance.close();
    loadingInstance = null;
  }
}
class Load extends React.Component{
  render() {
    const {loading, text} = this.props;
    if (!loading) return null;
    return (
      <div>
        <Mask transparent={true}/>
        <div className="toast">
          <i className="loading">
          </i>
          <p className="toast__content">{text}</p>
        </div>
      </div>
    );
  }
}
const loading = async function(text, loading = true) {
  loadingClose();
  const key = getUid();
  loadingInstance = await Notification();
  loadingInstance.addNotice({
    content: <Load text={text} loading={loading}/>,
    className: 'react-loading',
    key
  });
};
export {loading, loadingClose};

