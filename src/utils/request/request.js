/**
 * Created by chenlin on 2018/2/11 0011.
 */
import axios from 'axios';
import jsonp from './jsonp';
const fetch = (options) =>{
  let {
    method = 'get',
    url,
    data,
    cache = false,
    ...others
  } = options;
  let fetchData = cache ? data : Object.assign({}, data, {requestTime: new Date().getTime()});
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: fetchData,
        ...others
      });
    case 'post':
      return axios.post(url, fetchData, others || {});
    case 'delete':
      return axios.delete(url, fetchData, others || {});
    case 'put':
      return axios.put(url, fetchData, others || {});
    case 'jsonp':
      return jsonp({url, data: fetchData});
    default:
      return axios(options);
  }
};

const request = (options)=>{
  return fetch(options).then(response=>{
    const { statusText, status, data} = response;
    return {
      message: statusText,
      status,
      ...data
    };
  }).catch(error=>{
    const { response } = error;
    let msg;
    let status;
    let otherData = {};
    if (response) {
      const { data, statusText } = response;
      otherData = data;
      status = response.status;
      msg = data.message || statusText || data.RespDesc;
    } else {
      status = 600;
      msg = '网络异常！';
    }
    return {
      'RespCode': '00000600',
      status,
      'Data': otherData,
      'RespDesc': msg
    };
  });
};

export default request;
export {jsonp};
