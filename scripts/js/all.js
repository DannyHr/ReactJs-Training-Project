var ACTIONS = {
    CHANGE_CURRENT_ITEM: 'CHANGE_CURRENT_ITEM',
    TOGGLE_PREVIEW_SCREEN: 'TOGGLE_PREVIEW_SCREEN',
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
    TOGGLE_CART_CONTENT_CONTAINER: 'TOGGLE_CART_CONTENT_CONTAINER'
};

var STRINGS = {
    VIEW_MORE: 'View Product',
    QUICK_VIEW: 'Quick View',
    CURRENCY: 'BGN',
    HEADER_WELCOME: 'Welcome to our shop!',
    ADD_TO_CART: 'Add to Cart'
};

var VARS = {
    CART_ITEMS: 'cart_items'
};
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            // .length of function is 2
            'use strict';

            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}
var CartItem = createReactClass({
    displayName: 'CartItem',

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

        return React.createElement(
            'li',
            { className: 'item' },
            React.createElement(
                'span',
                { onClick: this.showItemPreview, className: 'item-link' },
                React.createElement(
                    'h3',
                    { className: 'item-name' },
                    this.props.item.name
                ),
                React.createElement(
                    'div',
                    { className: 'item-price' },
                    this.props.item.price + ' ' + STRINGS.CURRENCY
                ),
                React.createElement(
                    'div',
                    { className: 'item-remove-cart', onClick: this.removeItemFromCart },
                    '\xD7'
                )
            )
        );
    }
});

var CartContent = createReactClass({
    displayName: 'CartContent',

    contextTypes: {
        store: PropTypes.object
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().header;

        console.log('Render CartConent');

        if (state.itemsInCart.length) {
            var elementsToRender = state.itemsInCart.map(function (item) {
                return React.createElement(CartItem, { item: item, key: item.id });
            });

            return React.createElement(
                'ul',
                { className: 'items-list' },
                elementsToRender
            );
        } else {
            return React.createElement(
                'div',
                null,
                'List is empty'
            );
        }
    }
});
var Header = createReactClass({
    displayName: "Header",

    contextTypes: {
        store: PropTypes.object
    },
    componentDidMount: function () {
        var store = this.context.store;
        var self = this;
        store.subscribe(function () {
            self.forceUpdate();
        });
    },
    toggleCartContentContainer: function () {
        var store = this.context.store;
        var state = store.getState().header;

        var newState = !state.isCartContentContainerShown;

        store.dispatch({
            type: ACTIONS.TOGGLE_CART_CONTENT_CONTAINER,
            newState: newState
        });
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().header;

        console.log('Render Header');

        return React.createElement(
            "header",
            { id: "header-container" },
            React.createElement(
                "div",
                { id: "header-wrapper" },
                React.createElement(
                    "h1",
                    null,
                    STRINGS.HEADER_WELCOME
                ),
                React.createElement(
                    "nav",
                    { id: "header-navigation" },
                    React.createElement(
                        "div",
                        { id: "cart", onClick: this.toggleCartContentContainer },
                        "\uD83D\uDED2",
                        React.createElement(
                            "div",
                            { id: "cart-content-container", className: '' + (state.isCartContentContainerShown ? '' : 'hidden') },
                            React.createElement(CartContent, null)
                        )
                    ),
                    React.createElement(
                        "div",
                        { id: "nav-menu" },
                        "\u2630"
                    )
                )
            )
        );
    }
});
var HomePageView = createReactClass({
    displayName: 'HomePageView',

    contextTypes: {
        store: PropTypes.object
    },
    componentDidMount: function () {
        var store = this.context.store;
        var self = this;
        store.subscribe(function () {
            self.forceUpdate();
        });
    },
    render: function () {
        return React.createElement(
            'div',
            { id: 'home-page' },
            React.createElement(ItemsList, null),
            React.createElement(ItemPreviewContainer, null)
        );
    }
});
var ItemPreviewContainer = createReactClass({
    displayName: 'ItemPreviewContainer',

    contextTypes: {
        store: PropTypes.object
    },
    hidePreview: function () {
        var store = this.context.store;

        store.dispatch({
            type: ACTIONS.TOGGLE_PREVIEW_SCREEN,
            newState: false
        });
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().app;

        console.log('Render Header');

        if (state.isPreviewScreenShown) {
            return React.createElement(
                'div',
                { className: 'item-preview-screen fullscreen-popup' },
                React.createElement(
                    'div',
                    { id: 'item-preview-item-container' },
                    React.createElement(
                        'h2',
                        { className: 'item-name' },
                        state.previewScreenCurrentItem.name
                    ),
                    React.createElement(
                        'div',
                        { className: 'item-description' },
                        state.previewScreenCurrentItem.description
                    ),
                    React.createElement(
                        'div',
                        { className: 'item-price' },
                        state.previewScreenCurrentItem.price + ' ' + STRINGS.CURRENCY
                    ),
                    React.createElement(
                        'a',
                        { href: '#product=' + state.previewScreenCurrentItem.id, className: 'view-more-link' },
                        STRINGS.VIEW_MORE
                    ),
                    React.createElement(
                        'div',
                        { className: 'close-btn', onClick: this.hidePreview },
                        '\xD7'
                    )
                )
            );
        } else {
            return React.createElement('div', { className: 'item-preview-screen fullscreen-popup hidden' });
        }
    }
});
var ItemListEntity = createReactClass({
    displayName: 'ItemListEntity',

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

            store.dispatch({
                type: ACTIONS.ADD_ITEM_TO_CART,
                newItem: item
            });
        });
    },
    showItemPreview: function () {
        var store = this.context.store;
        store.dispatch({
            type: ACTIONS.CHANGE_CURRENT_ITEM,
            newItemIndex: this.props.item.id - 1
        });

        store.dispatch({
            type: ACTIONS.TOGGLE_PREVIEW_SCREEN,
            newState: true
        });
    },
    addItemToCart: function (e) {
        e.stopPropagation();
        var store = this.context.store;

        socket.emit('item_added', this.props.item);

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

        return React.createElement(
            'li',
            { className: 'item' },
            React.createElement(
                'span',
                { onClick: this.showItemPreview, className: 'quick-view-link' },
                React.createElement(
                    'h3',
                    { className: 'item-name' },
                    this.props.item.name
                ),
                React.createElement(
                    'div',
                    { className: 'item-description' },
                    this.props.item.description
                ),
                React.createElement(
                    'div',
                    { className: 'item-price' },
                    this.props.item.price + ' ' + STRINGS.CURRENCY
                ),
                React.createElement(
                    'a',
                    { href: '#product=' + this.props.item.id, className: 'item-link' },
                    STRINGS.VIEW_MORE
                ),
                React.createElement(
                    'span',
                    { className: 'item-add-cart', onClick: this.addItemToCart },
                    STRINGS.ADD_TO_CART
                )
            )
        );
    }
});

var ItemsList = createReactClass({
    displayName: 'ItemsList',

    contextTypes: {
        store: PropTypes.object
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().app;

        console.log('Render ItemsList');

        var elementsToRender = state.homePageAllItems.map(function (item) {
            return React.createElement(ItemListEntity, { item: item, key: item.id });
        });

        return React.createElement(
            'div',
            { className: 'items-list-container' },
            React.createElement(
                'h2',
                null,
                'Items List'
            ),
            React.createElement(
                'ul',
                { className: 'items-list' },
                elementsToRender
            )
        );
    }
});
var Main = createReactClass({
    displayName: "Main",

    render: function () {
        return React.createElement(
            "div",
            { id: "wrapper" },
            React.createElement(Header, null),
            React.createElement(HomePageView, null)
        );
    }
});
var appReducer = function (state, action) {
    switch (action.type) {
        case ACTIONS.CHANGE_CURRENT_ITEM:
            return Object.assign({}, state, {
                previewScreenCurrentItem: state.homePageAllItems[action.newItemIndex]
            });
        case ACTIONS.TOGGLE_PREVIEW_SCREEN:
            return Object.assign({}, state, {
                isPreviewScreenShown: action.newState
            });
        default:
            return state || {
                homePageAllItems: initialItems,
                previewScreenCurrentItem: {},
                isPreviewScreenShown: false
            };
    }
};
var headerReducer = function (state, action) {
    switch (action.type) {
        case ACTIONS.ADD_ITEM_TO_CART:
            var newItem = action.newItem;
            var newArray = state.itemsInCart.concat(newItem);

            var itemAlreadyInCart = state.itemsInCart.find(function (item) {
                return newItem.id == item.id;
            });

            if (!itemAlreadyInCart) {
                localStorage.setItem(VARS.CART_ITEMS, JSON.stringify(newArray));

                return Object.assign({}, state, {
                    itemsInCart: newArray
                });
            } else {
                return state;
            }
        case ACTIONS.REMOVE_ITEM_FROM_CART:
            var newArray = state.itemsInCart.filter(function (item) {
                return item.id != action.idToRemove;
            });

            localStorage.setItem(VARS.CART_ITEMS, JSON.stringify(newArray));

            return Object.assign({}, state, {
                itemsInCart: newArray
            });
        case ACTIONS.TOGGLE_CART_CONTENT_CONTAINER:
            console.log(state);
            return Object.assign({}, state, {
                isCartContentContainerShown: action.newState
            });
        default:
            return state || {
                itemsInCart: JSON.parse(localStorage.getItem(VARS.CART_ITEMS)) || [],
                isCartContentContainerShown: false
            };
    }
};
/**
 * Dump Data
 */
var initialItems = [{ id: 1, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }, { id: 2, name: "Jacket", description: "Brand new jacket", price: 75.50 }, { id: 3, name: "Car", description: "Brand new car", price: 7750 }, { id: 4, name: "Watch", description: "Brand new watch", price: 110.99 }, { id: 5, name: "Car", description: "Brand new car", price: 7750 }, { id: 6, name: "Watch", description: "Brand new watch", price: 110.99 }, { id: 7, name: "Jacket", description: "Brand new jacket", price: 75.50 }, { id: 8, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }];

var appStore = Redux.createStore(Redux.combineReducers({
    app: appReducer,
    header: headerReducer
}));
var socket = io();

ReactDOM.render(React.createElement(
    ReactRedux.Provider,
    { store: appStore },
    React.createElement(Main, null)
), document.getElementById('react-app'));
//# sourceMappingURL=all.js.map
