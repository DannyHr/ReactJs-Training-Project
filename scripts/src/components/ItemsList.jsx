var ItemListEntity = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
    propTypes: {
        item: PropTypes.object.isRequired
    },
    showItemPreview: function () {
        var store = this.context.store;
        store.dispatch({
            type: ACTIONS.CHANGE_CURRENT_ITEM,
            newItemIndex: (this.props.item.id - 1)
        });

        store.dispatch({
            type: ACTIONS.TOGGLE_PREVIEW_SCREEN,
            newState: true
        });
    },
    addItemToCart: function (e) {
        e.stopPropagation();
        var store = this.context.store;
        store.dispatch({
            type: ACTIONS.ADD_ITEM_TO_CART,
            newItem: this.props.item
        });
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().app;
        var self = this;

        console.log('Render ItemListEntity');

        return (
            <li className='item'>
                <span onClick={this.showItemPreview} className='quick-view-link'>
                    <h3 className='item-name'>{this.props.item.name}</h3>
                    <div className='item-description'>{this.props.item.description}</div>
                    <div className='item-price'>{this.props.item.price + ' ' + STRINGS.CURRENCY}</div>
                    <a href={'#product=' + this.props.item.id} className='item-link'>{STRINGS.VIEW_MORE}</a>
                    <span className='item-add-cart' onClick={this.addItemToCart}>{STRINGS.ADD_TO_CART}</span>
                </span>
            </li >
        )
    }
});

var ItemsList = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().app;

        console.log('Render ItemsList');

        var elementsToRender = state.homePageAllItems.map(function (item) {
            return (
                <ItemListEntity item={item} key={item.id} />
            );
        });

        return (
            <div className='items-list-container'>
                <h2>Items List</h2>
                <ul className='items-list'>
                    {elementsToRender}
                </ul>
            </div>
        );
    }
});