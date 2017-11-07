import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { STRINGS } from '../common/constants.js';
import { togglePreviewScreen, addItemToCart } from '../actions/actionCreators.js';
import { socket } from '../common/sockets.js';

var ItemPreviewContainer = createReactClass({
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
    },
    hidePreview: function () {
        var store = this.context.store;

        store.dispatch(togglePreviewScreen(false));
    },
    addItemToCart: function (e) {
        e.stopPropagation();
        var store = this.context.store;
        var state = store.getState().app;
        var userState = store.getState().user;
        var userId = userState.currentUser.id;

        socket.emit('item_added', { roomId: userId, item: state.previewScreenCurrentItem });

        store.dispatch(addItemToCart(state.previewScreenCurrentItem));
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