import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import ItemListEntity from './ItemListEntity.jsx';
import { STRINGS } from '../common/constants.js';

var SearchItemsList = createReactClass({
    contextTypes: {
        store: PropTypes.object,
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
        })
    },
    componentWillMount: function () {
        var self = this;
        var store = self.context.store;
        var state = store.getState().app;

        if (!state.searchResultItems || !state.searchResultItems.length) {
            self.context.router.history.push('/login');
        }
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().app;

        console.log('Render SearchItemsList');

        var elementsToRender = state.searchResultItems.map(function (item) {
            return (
                <ItemListEntity item={item} key={item.id} />
            );
        });

        return (
            <div className='items-list-container'>
                <h2>{STRINGS.SEARCH_RESULTS}</h2>
                <ul className='items-list'>
                    {elementsToRender}
                </ul>
            </div>
        );
    }
});

export default SearchItemsList;