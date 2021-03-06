import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { STRINGS } from '../common/constants.js';
import { addItemToCart, changeCurrentPreviewItem, togglePreviewScreen, changeCurrentProduct } from '../actions/actionCreators.js';
import { socket } from '../common/sockets.js';
import { addItemToCart as addItemToCartPost } from '../common/requester.js';
import { NotificationManager } from 'react-notifications';

var ItemListEntity = createReactClass({
    contextTypes: {
        store: PropTypes.object,
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
        })
    },
    propTypes: {
        item: PropTypes.object.isRequired
    },
    componentDidMount: function () {
        var self = this;
        socket.on('item_added', function (item) {
            var store = self.context.store;

            store.dispatch(addItemToCart(item));
        });
    },
    showItemPreview: function (e) {
        e.stopPropagation();

        var self = this;
        var store = self.context.store;
        store.dispatch(changeCurrentPreviewItem(self.props.item));
        store.dispatch(togglePreviewScreen(true));
    },
    addItemToCart: function (e) {
        e.stopPropagation();

        var self = this;
        var store = self.context.store;
        var userState = store.getState().user;
        var headerState = store.getState().header;

        var userId = userState.currentUser.id;

        var itemAlreadyInCart = headerState.itemsInCart.find(function (el) {
            return el.id === self.props.item.id;
        });

        if (!itemAlreadyInCart) {
            store.dispatch(addItemToCart(self.props.item));
            socket.emit('item_added', { roomId: userId, item: self.props.item });

            addItemToCartPost(userState.currentUser.id, self.props.item.id)
                .then(function (res) {
                    console.log('Item successfully saved in cart.');
                    NotificationManager.info('Item successfully saved in cart.');
                })
                .catch(function (err) {
                    console.error(err);
                    NotificationManager.success(err.response.data.description);
                });
        } else {
            console.log('This item is already in cart.');
            NotificationManager.warning('This item is already in cart.');
        }
    },
    goToProductPage: function (e) {
        e.stopPropagation();
        this.context.router.history.push('/product/' + this.props.item.id);
    },
    render: function () {
        console.log('Render ItemListEntity');

        return (
            <li className='item'>
                <span onClick={this.goToProductPage} className='quick-view-link'>
                    <h3 className='item-name'>{this.props.item.name}</h3>
                    <div className='item-description'>{this.props.item.description}</div>
                    <div className='item-image-container'><img src={this.props.imageSrc || '/images/no-image.png'} /></div>
                    <div className='item-price'>{this.props.item.price.toFixed(2) + ' '}<span className='item-price-currency'>{STRINGS.CURRENCY}</span></div>
                    <span className='item-link' onClick={this.showItemPreview}>{STRINGS.VIEW_MORE}</span>
                    <span className='item-add-cart' onClick={this.addItemToCart}>{STRINGS.ADD_TO_CART}</span>
                </span>
            </li >
        )
    }
});

export default ItemListEntity;