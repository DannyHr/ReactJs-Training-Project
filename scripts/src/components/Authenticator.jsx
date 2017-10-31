import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { GLOBALS } from '../../src/common/constants.js';
import { loginUser, logoutUser } from '../actions/actionCreators.js';
import { retrieveUser } from '../common/requester.js';
import { User } from '../models/user.js';

var Authenticator = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
    componentWillMount: function () {
        var self = this;
        var store = self.context.store;

        var authToken = localStorage.getItem(GLOBALS.AUTH_TOKEN);
        var authId = localStorage.getItem(GLOBALS.AUTH_ID);
        var authUsername = localStorage.getItem(GLOBALS.AUTH_USERNAME);

        if (authToken && authId) {
            // initial fake login to display the saved name. When we have the response we set the correct name and id
            store.dispatch(loginUser(new User(authId, authUsername, authToken)));

            retrieveUser().then(function (response) {
                store.dispatch(loginUser(new User(response.data._id, response.data.username, authToken)));
            }).catch(function (error) {
                store.dispatch(logoutUser());
                console.log(error);
            });
        } else {
            store.dispatch(logoutUser());
        }
    },
    render: function () {
        if (!this.props.children) {
            return null;
        } else if (React.isValidElement(this.props.children)) {
            return this.props.children;
        }
        return <span>{this.props.children}</span>;
    }
});

export default Authenticator;

