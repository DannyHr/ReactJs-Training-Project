import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CartItem from './CartItem.jsx';
import { getCartItems, getItem } from '../common/requester.js';
import { addItemToCart, logoutUser } from '../actions/actionCreators.js';
import { Item } from '../models/item.js';

var CartContent = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
    componentWillMount: function () {
        var store = this.context.store;
        var uesrState = store.getState().user;
        var currentUserId = uesrState.currentUser.id;

        getCartItems(currentUserId)
            .then(function (res) {
                res.data.forEach(function (element) {
                    getItem(element.itemId)
                        .then(function (response) {
                            var item = response.data[0];
                            store.dispatch(addItemToCart(new Item(item._id, item.name, item.description, item.price)));
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });
            })
            .catch(function (err) {
                console.log(err);
                store.dispatch(logoutUser());
                this.context.router.history.push('/');
            });
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().header;

        console.log('Render CartConent');

        if (state.itemsInCart.length) {
            var elementsToRender = state.itemsInCart.map(function (item) {
                return (
                    <CartItem item={item} key={item.id} />
                );
            });

            return (
                <ul className='items-list'>
                    {elementsToRender}
                </ul>
            )
        } else {
            return (
                <div>List is empty</div>
            )
        }
    }
});

export default CartContent;