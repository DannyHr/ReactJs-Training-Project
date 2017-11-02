import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { STRINGS } from '../common/constants.js';

var ProductPageView = createReactClass({
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

        var itemAlreadyInCart = headerState.itemsInCart.find(function (el) {
            return el.id === self.props.item.id;
        });

        if (!itemAlreadyInCart) {
            store.dispatch(addItemToCart(self.props.item));
            socket.emit('item_added', self.props.item);

            addItemToCartPost(userState.currentUser.id, self.props.item.id)
                .then(function (res) {
                    console.log('Item successfully saved in cart.');
                })
                .catch(function (err) {
                    console.error(err);
                });
        } else {
            console.log('Item already in cart.');
        }
    },
    render: function () {
        var currentProduct = this.props.item;
        console.log(currentProduct);
        if (currentProduct) {
            return (
                <div id='product-page-container' className='page-container'>
                    <h3 className='item-name'>{currentProduct.name}</h3>
                    <div className='item-image-container'>
                        <a href={currentProduct.imageSrc || '/images/no-image.png'}>
                            <img src={currentProduct.imageSrc || '/images/no-image.png'} />
                        </a>
                    </div>
                    <div className='item-description'>{currentProduct.description}</div>
                    <div className='item-price'>{currentProduct.price.toFixed(2) + ' '}<span className='item-price-currency'>{STRINGS.CURRENCY}</span></div>
                    <span className='item-add-cart' onClick={this.addItemToCart}>{STRINGS.ADD_TO_CART}</span>
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