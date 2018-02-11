/**
 * Created by chenlin on 2018/2/11 0011.
 */

const formatData = (data) => {
  if (typeof data === 'string'){
    return data;
  }
  if (typeof data === 'object'){
    let arr = [];
    for (let name in data){
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&');
  }
  return data;
};

const fetchJsonp = (options)=> {
  console.log(options);
  if (!options.url || !options.data) {
    throw new Error('Parameter  error');
  }
  const callbackName = options['callbackName'] || 'jsonp' + new Date().getTime();
  const timeout = options.timeout || 20000;
  const data = formatData(options.data);
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  let timer = null;
  script.src = options.url + (options.url.indexOf('?') === -1 ? '?' : '&') + data + '&' + 'callback=' + callbackName + '&' + new Date().getTime();
  script.id = 'id' + callbackName;
  function cleanUp() {
    head.removeChild(script);
    window[callbackName] = null;
    timer && clearTimeout(timer);
  }
  if (timeout) {
    timer && clearTimeout(timer);
    timer = setTimeout(()=>{
      cleanUp();
      options.fail && options.fail({error: 'timeout'});
    }, timeout);
  }
  window[callbackName] = (response)=>{
    cleanUp();
    options.success && options.success(response);
  };
  head.appendChild(script);
};
const jsonp = (options) =>{
  return new Promise((resolve, reject)=>{
    let {url, data, ...others} = options;
    fetchJsonp({
      url,
      data,
      ...others,
      success: (response)=>{
        resolve(response);
      },
      fail: (error)=>{
        reject(error);
      }
    });
  });
};
export default jsonp;
