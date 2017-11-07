import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CartContent from './CartContent.jsx';
import { STRINGS } from '../common/constants.js';
import { Link } from 'react-router-dom';
import { toggleCartContentContainer, logoutUser } from '../actions/actionCreators.js';
import { logoutUser as logoutUserPost } from '../common/requester.js';
import SearchField from './SearchField.jsx';
import { NotificationManager } from 'react-notifications';

var Header = createReactClass({
    contextTypes: {
        store: PropTypes.object,
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
        })
    },
    componentDidMount: function () {
        var store = this.context.store;
        var self = this;
        this.unsubscribe = store.subscribe(function () {
            self.forceUpdate();
        });
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    toggleCartContentContainer: function () {
        var store = this.context.store;
        var state = store.getState().header;

        var newState = !(state.isCartContentContainerShown);

        store.dispatch(toggleCartContentContainer(newState));
    },
    logout: function () {
        var self = this;
        var store = this.context.store;

        logoutUserPost().then(function (response) {
            console.log(response);
            store.dispatch(logoutUser());
            self.context.router.history.push('/?logout');
            NotificationManager.success('Logged out successfully!');
        }).catch(function (error) {
            console.log(error);
            NotificationManager.error(error.response.data.description, 'Unsuccessful logout!');            
        });
    },
    render: function () {
        var store = this.context.store;
        var headerState = store.getState().header;
        var userState = store.getState().user;

        console.log('Render Header');

        return (
            <header id="header-container">
                <div id="header-wrapper">
                    <h1><Link to="/">{STRINGS.HEADER_WELCOME}</Link></h1>
                    <nav id="header-navigation">

                        {userState.userIsLoggedIn ?
                            (
                                <span>
                                    <div id="user-greetings">Welcome, {userState.currentUser.username}!
                                        &nbsp;<span onClick={this.logout}>{STRINGS.LOGOUT}</span>
                                    </div>
                                    <div id="header-search">
                                        <SearchField />
                                    </div>
                                    <div id="cart" onClick={this.toggleCartContentContainer}><i className="fa fa-shopping-cart"></i>
                                        <div id="cart-content-container" className={'' + (headerState.isCartContentContainerShown ? '' : 'hidden')}>
                                            <CartContent />
                                        </div>
                                    </div>
                                </span>
                            )
                            :
                            (
                                <div id="login-button">
                                    <Link to="/login">
                                        <span>{STRINGS.LOGIN}</span>
                                    </Link>
                                </div>
                            )
                        }
                        <div id="nav-menu"><i className="fa fa-bars"></i></div>
                    </nav>
                </div>
            </header>
        );
    }
});

export default Header;
