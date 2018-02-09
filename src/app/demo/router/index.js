/**
 * Created by chenlin on 2018/2/7 0007.
 */
import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {asyncComponent} from 'components/asyncComponent/index';
const Index = asyncComponent(()=>import('../page/index/index.js'));
export default class RouterConfig extends React.Component{
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Index}/>
        </div>
      </Router>
    );
  }
}
