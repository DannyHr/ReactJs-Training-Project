import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from './store/AppStore.jsx';
import Main from './components/Main.jsx';
import './requests.js';

ReactDOM.render(
    <Provider store={appStore}>
        <Main />
    </Provider>,
    document.getElementById('react-app')
);