import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './App';
import Home from './containers/Home';
import Eval from './containers/Eval';
import Upload from './containers/Upload';

import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="evaluate" component={Eval}/>
            <Route path="upload" component={Upload}/>
        </Route>
    </Router>,
    document.getElementById('root')
);