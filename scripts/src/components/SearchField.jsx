import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { STRINGS } from '../common/constants.js';
import { searchAllItems } from '../common/requester.js';
import { addToSearchResults, cleanSearchResults } from '../actions/actionCreators.js';

var SearchField = createReactClass({
    contextTypes: {
        store: PropTypes.object,
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
        })
    },
    getInitialState: function () {
        return {
            searchKeyword: ''
        };
    },
    search: function () {
        var self = this;
        var store = self.context.store;
        var appState = store.getState().app;

        var keyword = self.state.searchKeyword;

        store.dispatch(cleanSearchResults());

        searchAllItems(appState.allItems, keyword)
            .then(function (res) {
                store.dispatch(addToSearchResults(res.data));
                self.context.router.history.push('/search');
                console.log(res);
            })
            .catch(function (err) {
                console.log(err);
            });
    },
    render: function () {
        var self = this;

        return (
            <span>
                <button id="header-search-button" type="button" onClick={self.search}>
                    <i className="fa fa-search"></i>
                </button>
                <input type="text" id="header-search-field" placeholder={STRINGS.SEARCH_PLACEHOLDER} onChange={function (e) {
                    var newValue = e.target.value;
                    self.setState({ searchKeyword: newValue });
                }} onKeyPress={function (event) {
                    if (event.key == 'Enter') {
                        self.search();
                    }
                }} />
            </span>
        )
    }
});

export default SearchField;
