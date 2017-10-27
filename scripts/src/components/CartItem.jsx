import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { STRINGS } from '../common/constants.js';
import { socket } from '../common/sockets.js';
import { removeItemFromCart } from '../actions/actionCreators.js';

var CartItem = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
    propTypes: {
        item: PropTypes.object.isRequired
    },
    componentDidMount: function () {
        var self = this;
        socket.on('item_removed', function (id) {
            var store = self.context.store;
            store.dispatch(removeItemFromCart(id));
        });
    },
    removeItemFromCart: function (e) {
        e.stopPropagation();
        var store = this.context.store;

        socket.emit('item_removed', this.props.item.id);

        store.dispatch(removeItemFromCart(this.props.item.id));
    },
    render: function () {
        console.log('Render CartItem');

        return (
            <li className='item'>
                <span onClick={this.showItemPreview} className='item-link'>
                    <h3 className='item-name'>{this.props.item.name}</h3>
                    <div className='item-price'>{this.props.item.price.toFixed(2) + ' ' + STRINGS.CURRENCY}</div>
                    <div className="item-remove-cart" onClick={this.removeItemFromCart}>&#215;</div>
                </span>
            </li>
        )
    }
});

export default CartItem;