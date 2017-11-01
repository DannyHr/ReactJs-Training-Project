import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import ItemListEntity from './ItemListEntity.jsx';
import { STRINGS } from '../common/constants.js';

var ItemsList = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().app;

        console.log('Render ItemsList');

        var elementsToRender = state.allItems.map(function (item) {
            return (
                <ItemListEntity item={item} key={item.id} />
            );
        });

        return (
            <div className='items-list-container'>
                <h2>{STRINGS.ALL_PRODUCTS}</h2>
                <ul className='items-list'>
                    {elementsToRender}
                </ul>
            </div>
        );
    }
});

export default ItemsList;