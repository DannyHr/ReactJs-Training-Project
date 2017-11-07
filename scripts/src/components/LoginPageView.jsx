import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import axios from 'axios';
import { loginUser } from '../actions/actionCreators.js';
import { loginUser as loginUserPost, verifyRecaptchaSite } from '../common/requester.js';
import { User } from '../models/user.js';
import { STRINGS } from '../common/constants.js';
import { socket } from '../common/sockets.js';
import Recaptcha from 'react-gcaptcha';
import { NotificationManager } from 'react-notifications';

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
            password: '',
            recaptchaUserResponse: '',
            recaptchaResetNum: 0
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

        var userResponse = self.state.recaptchaUserResponse;

        if (userResponse) {
            verifyRecaptchaSite(userResponse)
                .then(function (recaptchaResponse) {
                    console.log(recaptchaResponse);
                    if (recaptchaResponse.data.success) {
                        var loginData = {
                            username: self.state.username,
                            password: self.state.password
                        };

                        loginUserPost(loginData).then(function (response) {
                            console.log(response.data);
                            if (response.data.code == 200 || response.status == 200) {
                                store.dispatch(loginUser(new User(response.data._id, response.data.username, response.data._kmd.authtoken)));
                                socket.emit('joinroom', { roomId: response.data._id });
                                self.context.router.history.push('/');
                                NotificationManager.success('Logged in successfully!');
                            } else {
                                console.warn(response.data.code || response.status);
                            }
                        }).catch(function (loginError) {
                            console.log('Unsuccessful login: ' + loginError.response.data.description);
                            NotificationManager.error(loginError.response.data.description, 'Unsuccessful login');
                            self.resetCaptcha();
                        });
                    } else {
                        console.log('Unsuccessful recaptcha verification: ' + recaptchaResponse.data['error-codes'].join(', '));
                        NotificationManager.error(recaptchaResponse.data['error-codes'].join(', '), 'Unsuccessful reCAPTCHA verification');
                    }
                })
                .catch(function (recaptchaError) {
                    console.log('Unsuccessful recaptcha: ' + recaptchaError.description);
                    NotificationManager.error(recaptchaError.description, 'Unsuccessful reCAPTCHA verification');

                });
        } else {
            console.log('Please verify you are not a robot.');
            NotificationManager.warning('Please verify you are not a robot using reCAPTCHA!');
        }
    },
    verifyCallback: function (userResponse) {
        this.setState(function () {
            return {
                recaptchaUserResponse: userResponse
            };
        });
    },
    resetCaptcha: function () {
        var self = this;
        self.setState({ 
            recaptchaResetNum: self.state.recaptchaResetNum + 1,
            recaptchaUserResponse: ''
        });
    },
    render: function () {
        var self = this;
        return (
            <div id='login-page-container' className='page-container'>
                <div id="login-form-container">
                    <h2>{STRINGS.LOGIN_PAGE_TITLE}</h2>
                    <input type="text" name="username" id="username" required="required" placeholder={STRINGS.USERNAME} onChange={function (e) {
                        var newValue = e.target.value;
                        self.setState({ username: newValue });
                    }} />
                    <input type="password" name="password" id="password" required="required" placeholder={STRINGS.PASSWORD} onChange={function (e) {
                        var newValue = e.target.value;
                        self.setState({ password: newValue });
                    }} />
                    <Recaptcha
                        sitekey="6LcMbDcUAAAAADV5OgAiZah0u7e6kiDlaighUGjm"
                        onloadCallbackName='voidFunction'
                        verifyCallback={self.verifyCallback}
                        reset={self.state.recaptchaResetNum || 0}
                    />
                    <button type="submit" onClick={this.login}>{STRINGS.LOGIN}</button>
                </div>
            </div>
        );
    }
});

export default LoginPageView;