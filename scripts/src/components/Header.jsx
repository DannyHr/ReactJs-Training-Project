import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CartContent from './CartContent.jsx';
import { ACTIONS, STRINGS } from '../common/constants.js';

var Header = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
    componentDidMount: function () {
        var store = this.context.store;
        var self = this;
        store.subscribe(function () {
            self.forceUpdate();
        });
    },
    toggleCartContentContainer: function () {
        var store = this.context.store;
        var state = store.getState().header;

        var newState = !(state.isCartContentContainerShown);

        store.dispatch({
            type: ACTIONS.TOGGLE_CART_CONTENT_CONTAINER,
            newState: newState
        });
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().header;

        console.log('Render Header');

        return (
            <header id="header-container">
                <div id="header-wrapper">
                    <h1>{STRINGS.HEADER_WELCOME}</h1>
                    <nav id="header-navigation">
                        <div id="header-search">
                            <button id="header-search-button" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                            <input type="text" id="header-search-field" placeholder="Not Implemented Yet" />
                        </div>
                        <div id="cart" onClick={this.toggleCartContentContainer}><i className="fa fa-shopping-cart"></i>
                            <div id="cart-content-container" className={'' + (state.isCartContentContainerShown ? '' : 'hidden')}>
                                <CartContent />
                            </div>
                        </div>
                        <div id="nav-menu"><i className="fa fa-bars"></i></div>
                    </nav>
                </div>
            </header>
        )
    }
});

export default Header;
