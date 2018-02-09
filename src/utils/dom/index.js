/**
 * Created by chenlin on 2018/1/23 0023.
 */

export function hasClass(ele, className) {
  if (typeof ele === 'string') ele = document.querySelector(ele);
  if (ele.classList) {
    return ele.classList.contains(className);
  }
  return new RegExp('(^|\\s)' + className + '(\\s|$)').test(ele.className);
}

export function addClass(ele, className) {
  if (typeof ele === 'string') ele = document.querySelector(ele);
  const eles = (ele instanceof NodeList) ? [].slice.call(ele) : [ele];
  eles.forEach(el=>{
    if (hasClass(el, className)) {
      return false;
    }
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  });
}

export function removeClass(ele, className) {
  if (typeof ele === 'string') ele = document.querySelector(ele);
  const eles = (ele instanceof NodeList) ? [].slice.call(ele) : [ele];
  eles.forEach(el=>{
    if (hasClass(el, className)) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }
  });
}

export function getData(ele, name, val) {
  let prefix = 'data-';
  if (val) {
    return ele.setAttribute(prefix + name, val);
  } else {
    return ele.getAttribute(prefix + name);
  }
}

export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}

export function getOffset(ele) {
  const html = document.documentElement;
  let box = { top: 0, left: 0 };
  if (typeof ele.getBoundingClientRect !== 'undefined') {
    box = ele.getBoundingClientRect();
  }
  return {
    top: box.top + window.pageYOffset - html.clientTop,
    left: box.left + window.pageXOffset - html.clientLeft
  };
}
export function on(ele, type, handle) {
  if (ele.addEventListener) {
    ele.addEventListener(type, handle, false);
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + type, handle);
  } else {
    ele['on' + type] = handle;
  }
}

export function off(ele, type, handle) {
  if (ele.removeEventListener) {
    ele.removeEventListener(type, handle, false);
  } else if (ele.detachEvent) {
    ele.detachEvent('on' + type, handle);
  } else {
    ele['on' + type] = null;
  }
}

