import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import SearchItemsList from './SearchItemsList.jsx';
import { cleanSearchResults } from '../actions/actionCreators.js';

var SearchPageView = createReactClass({
    contextTypes: {
        store: PropTypes.object
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
        
        var store = this.context.store;        
        store.dispatch(cleanSearchResults());
    },
    render: function () {
        return (
            <div id='search-page-container' className='page-container'>
                <SearchItemsList />
            </div>
        )
    }
});

export default SearchPageView;