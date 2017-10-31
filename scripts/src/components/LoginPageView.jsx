import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import axios from 'axios';
import { loginUser } from '../actions/actionCreators.js';
import { loginUser as loginUserPost } from '../common/requester.js';
import { User } from '../models/user.js';
import { STRINGS } from '../common/constants.js';

var LoginPageView = createReactClass({
    contextTypes: {
        store: PropTypes.object,
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
        })
    },
    getInitialState: function () {
        return {
            username: '',
            password: ''
        };
    },
    componentDidMount: function () {
        var self = this;
        var store = self.context.store;
        this.unsubscribe = store.subscribe(function () {
            self.forceUpdate();
        });
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    login: function () {
        var self = this;
        var store = self.context.store;
        
        var loginData = {
            username: self.state.username,
            password: self.state.password
        }

        loginUserPost(loginData).then(function (response) {
            console.log(response.data);
            if (response.data.code == 200 || response.status == 200) {
                store.dispatch(loginUser( new User(response.data._id, response.data.username, response.data._kmd.authtoken)));
                self.context.router.history.push('/');
            } else {
                console.warn(response.data.code || response.status);
            }
        }).catch(function (error) {
            console.log(error);
        });
    },
    render: function () {
        var self = this;
        return (
            <div id='login-page-container' className='page-container'>
                <div id="login-form-container">
                    <h2>{STRINGS.LOGIN_PAGE_TITLE}</h2>
                    <input type="text" name="username" id="username" placeholder={STRINGS.USERNAME} onChange={function (e) {
                        var newValue = e.target.value;
                        self.setState({ username: newValue });
                    }} />
                    <input type="password" name="password" id="password" placeholder={STRINGS.PASSWORD} onChange={function (e) {
                        var newValue = e.target.value;                        
                        self.setState({ password: newValue });
                    }} />
                    <button type="submit" onClick={this.login}>{STRINGS.LOGIN}</button>
                </div>
            </div>
        );
    }
});

export default LoginPageView;