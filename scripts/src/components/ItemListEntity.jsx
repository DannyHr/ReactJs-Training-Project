import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { STRINGS } from '../common/constants.js';
import { addItemToCart, changeCurrentItem, togglePreviewScreen } from '../actions/actionCreators.js';
import { socket } from '../common/sockets.js';

var ItemListEntity = createReactClass({
    contextTypes: {
        store: PropTypes.object
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
    showItemPreview: function () {
        var store = this.context.store;
        store.dispatch(changeCurrentItem(this.props.item.id - 1));
        store.dispatch(togglePreviewScreen(true));
    },
    addItemToCart: function (e) {
        e.stopPropagation();
        var store = this.context.store;

        socket.emit('item_added', this.props.item);

        store.dispatch(addItemToCart(this.props.item));
    },
    render: function () {
        console.log('Render ItemListEntity');

        return (
            <li className='item'>
                <span onClick={this.showItemPreview} className='quick-view-link'>
                    <h3 className='item-name'>{this.props.item.name}</h3>
                    <div className='item-description'>{this.props.item.description}</div>
                    <div className='item-image-container'><img src={this.props.imageSrc || '/images/no-image.png'} /></div>
                    <div className='item-price'>{this.props.item.price.toFixed(2) + ' '}<span className='item-price-currency'>{STRINGS.CURRENCY}</span></div>
                    <a href={'#product=' + this.props.item.id} className='item-link'>{STRINGS.VIEW_MORE}</a>
                    <span className='item-add-cart' onClick={this.addItemToCart}>{STRINGS.ADD_TO_CART}</span>
                </span>
            </li >
        )
    }
});

export default ItemListEntity;