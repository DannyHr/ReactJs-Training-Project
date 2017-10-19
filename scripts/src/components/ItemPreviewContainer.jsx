import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { ACTIONS, STRINGS } from '../common/constants.js';


var ItemPreviewContainer = createReactClass({
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
    hidePreview: function () {
        var store = this.context.store;

        store.dispatch({
            type: ACTIONS.TOGGLE_PREVIEW_SCREEN,
            newState: false
        });
    },
    addItemToCart: function (e) {
        e.stopPropagation();
        var store = this.context.store;
        var state = store.getState().app;

        socket.emit('item_added', state.previewScreenCurrentItem);

        store.dispatch({
            type: ACTIONS.ADD_ITEM_TO_CART,
            newItem: state.previewScreenCurrentItem
        });
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().app;

        console.log('Render Header');

        if (state.isPreviewScreenShown) {
            return (
                <div className='item-preview-screen fullscreen-popup'>
                    <div id="item-preview-item-container">
                        <h2 className='item-name'>{state.previewScreenCurrentItem.name}</h2>
                        <div className='item-image-container'><img src={state.previewScreenCurrentItem.imageSrc || '/images/no-image.png'} /></div>
                        <div className='item-description'>{state.previewScreenCurrentItem.description}</div>
                        <div className="item-lower-elements">
                            <div className='item-price'>{state.previewScreenCurrentItem.price.toFixed(2) + ' ' + STRINGS.CURRENCY}</div>
                            <span className='item-add-cart' onClick={this.addItemToCart}>{STRINGS.ADD_TO_CART}</span>
                        </div>
                        <div className="close-btn" onClick={this.hidePreview}>&#215;</div>
                    </div>
                </div>
            );
        }
        else {
            return '';
        }
    }
});

export default ItemPreviewContainer;