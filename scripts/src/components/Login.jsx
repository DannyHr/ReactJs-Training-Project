import React from 'react';
import createReactClass from 'create-react-class';
import Header from './Header.jsx';
import LoginPageView from './LoginPageView.jsx';
import PropTypes from 'prop-types';

var Login = createReactClass({
    contextTypes: {
        store: PropTypes.object,
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
        })
    },
    componentWillMount: function () {
        var self = this;
        var store = self.context.store;
        var userState = store.getState().user;

        if(userState.userIsLoggedIn) {
            console.log('You are already logged in');
            self.context.router.history.push('/');
        }
    },
    render: function () {
        return (
            <div id="wrapper" className="login-page">
                <Header />
                <LoginPageView />
            </div>
        );
    }
});

export default Login;