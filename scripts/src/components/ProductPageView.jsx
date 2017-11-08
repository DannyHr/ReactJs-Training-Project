import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { STRINGS } from '../common/constants.js';
import { socket } from '../common/sockets.js';
import { addItemToCart } from '../actions/actionCreators.js';
import { addItemToCart as addItemToCartPost } from '../common/requester.js';
import { NotificationManager } from 'react-notifications';

var ProductPageView = createReactClass({
    contextTypes: {
        store: PropTypes.object,
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
        })
    },
    getDefaultProps: function () {
        return {
            item: null
        };
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
                    NotificationManager.success('Item successfully saved in cart.');
                })
                .catch(function (err) {
                    console.error(err);
                    NotificationManager.success(err.response.data.description);
                });
        } else {
            console.log('Item already in cart.');
            NotificationManager.warning('This item is already in cart.');
        }
    },
    render: function () {
        var currentProduct = this.props.item;
        console.log(currentProduct);
        if (currentProduct) {
            var descriptionParagraphs = [];
            if (Array.isArray(currentProduct.longDescription)) {
                descriptionParagraphs = currentProduct.longDescription.map(function (element, index) {
                    return (
                        <p key={index}>{element}</p>
                    );
                });
            } else {
                descriptionParagraphs.push(<p>{currentProduct.longDescription}</p>);
            }

            return (
                <div id='product-page-container' className='page-container'>
                    <h3 className='item-name'>{currentProduct.name}</h3>
                    <div className='date-created'>Added {currentProduct.dateCreated.toLocaleDateString('bg-BG')}&nbsp;</div>
                    <div className='date-modified'>Last modified {currentProduct.dateModified.toLocaleDateString('bg-BG')}</div>
                    <div className='content-container'>
                        <div className='item-image-container'>
                            <a href={currentProduct.imageSrc || '/images/no-image.png'}>
                                <img src={currentProduct.imageSrc || '/images/no-image.png'} />
                            </a>
                        </div>
                        <div className='item-description'>{descriptionParagraphs}</div>
                        <div className='bottom-container'>
                            <div className='item-price'>
                                {currentProduct.price.toFixed(2) + ' '}
                                <span className='item-price-currency'>{STRINGS.CURRENCY}</span>
                            </div>
                            <span className='item-add-cart' onClick={this.addItemToCart}>{STRINGS.ADD_TO_CART}</span>
                            {currentProduct.tags ?
                                <div className='item-tags'>Tags: {currentProduct.tags.join(', ')}</div>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div id='product-page-container' className='page-container'>
                <h3>Loading...</h3>
            </div>
            );
        }
    }
});

export default ProductPageView;