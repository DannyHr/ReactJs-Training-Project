import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { GLOBALS } from '../common/constants.js';
import SearchPageView from './SearchPageView.jsx';
import Header from './Header.jsx';
import ItemPreviewContainer from './ItemPreviewContainer.jsx';

var Search = createReactClass({
    contextTypes: {
        store: PropTypes.object,
    },
    componentWillMount: function () {
        var store = this.context.store;
        var userState = store.getState().user;

        if (!userState.userIsLoggedIn) {
            this.context.router.history.push('/login');
        }
    },
    componentWillUpdate: function () {
        var store = this.context.store;
        var userState = store.getState().user;

        if (!userState.userIsLoggedIn) {
            this.context.router.history.push('/login');
        }
    },
    render: function () {
        console.log('Search page rendered');
        return (
            <div id="wrapper" className="search-page">
                <Header />
                <SearchPageView />
                <ItemPreviewContainer />
            </div>
        );
    }
});

export default Search;