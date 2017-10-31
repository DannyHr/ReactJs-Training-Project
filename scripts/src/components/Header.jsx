import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CartContent from './CartContent.jsx';
import { STRINGS } from '../common/constants.js';
import { Link } from 'react-router-dom';
import { toggleCartContentContainer, logoutUser } from '../actions/actionCreators.js';
import { logoutUser as logoutUserPost } from '../common/requester.js';

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
        }).catch(function (error) {
            console.log(error);
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
                                <div id="user-greetings">Welcome, {userState.currentUser.username}!
                                    &nbsp;<span onClick={this.logout}>Logout</span>
                                </div>
                            )
                            : 
                            (
                                <div id="login-button">
                                    <Link to="/login">
                                        <span>Login</span>
                                    </Link>
                                </div>
                            )}

                        <div id="header-search">
                            <button id="header-search-button" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                            <input type="text" id="header-search-field" placeholder="Not Implemented Yet" />
                        </div>
                        {userState.userIsLoggedIn ? 
                            (
                                <div id="cart" onClick={this.toggleCartContentContainer}><i className="fa fa-shopping-cart"></i>
                                    <div id="cart-content-container" className={'' + (headerState.isCartContentContainerShown ? '' : 'hidden')}>
                                        <CartContent />
                                    </div>
                                </div>
                            ) : ''
                        }
                        <div id="nav-menu"><i className="fa fa-bars"></i></div>
                    </nav>
                </div>
            </header>
        );
    }
});

export default Header;
