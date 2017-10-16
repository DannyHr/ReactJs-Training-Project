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
            store.dispatch({
                type: ACTIONS.REMOVE_ITEM_FROM_CART,
                idToRemove: id
            });
        });
    },
    removeItemFromCart: function (e) {
        e.stopPropagation();
        var store = this.context.store;

        socket.emit('item_removed', this.props.item.id);

        store.dispatch({
            type: ACTIONS.REMOVE_ITEM_FROM_CART,
            idToRemove: this.props.item.id
        });
    },
    render: function () {
        console.log('Render CartItem');

        return (
            <li className='item'>
                <span onClick={this.showItemPreview} className='item-link'>
                    <h3 className='item-name'>{this.props.item.name}</h3>
                    <div className='item-price'>{this.props.item.price + ' ' + STRINGS.CURRENCY}</div>
                    <div className="item-remove-cart" onClick={this.removeItemFromCart}>&#215;</div>
                </span>
            </li>
        )
    }
})

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