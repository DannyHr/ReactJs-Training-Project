import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import appStore from './stores/AppStore.jsx';
import Main from './components/Main.jsx';

global.socket = io();

ReactDOM.render(
    <Provider store={appStore}>
        <Main />
    </Provider>,
    document.getElementById('react-app')
);