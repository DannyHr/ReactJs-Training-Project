import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CartItem from './CartItem.jsx';

var CartContent = createReactClass({
    contextTypes: {
        store: PropTypes.object
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