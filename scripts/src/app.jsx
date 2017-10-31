import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from './store/AppStore.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Authenticator from './components/Authenticator.jsx';
import { HashRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <Provider store={appStore}>
        <HashRouter>
            <Authenticator>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
            </Authenticator>
        </HashRouter>
    </Provider>,
    document.getElementById('react-app')
);