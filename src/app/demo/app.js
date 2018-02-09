/**
 * Created by chenlin on 2018/2/7 0007.
 */
import '../../index.scss';
import 'lib-flexible';
import React from 'react';
import ReactDOM from 'react-dom';
import RouterConfig from './router/index';

class App extends React.Component{
  render() {
    return (
      <RouterConfig/>
    );
  }
}
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

