var ACTIONS = {
    CHANGE_CURRENT_ITEM: 'CHANGE_CURRENT_ITEM',
    TOGGLE_PREVIEW_SCREEN: 'TOGGLE_PREVIEW_SCREEN'

};

var STRINGS = {
    VIEW_MORE: 'View Product',
    QUICK_VIEW: 'Quick View',
    CURRENCY: 'BGN',
    HEADER_WELCOME: 'Welcome to our shop!'
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
var Header = createReactClass({
    displayName: "Header",

    render: function () {
        return React.createElement(
            "header",
            { id: "header-container" },
            React.createElement(
                "h1",
                null,
                STRINGS.HEADER_WELCOME
            )
        );
    }
});
var HomePageView = createReactClass({
    displayName: 'HomePageView',

    componentDidMount: function () {
        var store = this.context.store;
        store.subscribe(function () {
            this.forceUpdate();
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

HomePageView.contextTypes = {
    store: PropTypes.object
};
var ItemPreviewContainer = createReactClass({
    displayName: 'ItemPreviewContainer',

    hidePreview: function () {
        var store = this.context.store;
        store.dispatch({
            type: ACTIONS.TOGGLE_PREVIEW_SCREEN,
            newState: false
        });
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState();

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

ItemPreviewContainer.contextTypes = {
    store: PropTypes.object
};
var ItemListEntity = createReactClass({
    displayName: 'ItemListEntity',

    propTypes: {
        item: PropTypes.object.isRequired
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
    render: function () {
        var store = this.context.store;
        var state = store.getState();

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
                )
            )
        );
    }
});

ItemListEntity.contextTypes = {
    store: PropTypes.object
};

var ItemsList = createReactClass({
    displayName: 'ItemsList',

    render: function () {
        var store = this.context.store;
        var state = store.getState();

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

ItemsList.contextTypes = {
    store: PropTypes.object
};
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
    // console.log(action)
    // console.log(state)

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
            return state;
    }
};
/**
 * Dump Data
 */
var initialItems = [{ id: 1, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }, { id: 2, name: "Jacket", description: "Brand new jacket", price: 75.50 }, { id: 3, name: "Car", description: "Brand new car", price: 7750 }, { id: 4, name: "Watch", description: "Brand new watch", price: 110.99 }, { id: 5, name: "Car", description: "Brand new car", price: 7750 }, { id: 6, name: "Watch", description: "Brand new watch", price: 110.99 }, { id: 7, name: "Jacket", description: "Brand new jacket", price: 75.50 }, { id: 8, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }];

var appStore = Redux.createStore(appReducer, {
    homePageAllItems: initialItems,
    previewScreenCurrentItem: {},
    isPreviewScreenShown: false
});
ReactDOM.render(React.createElement(
    ReactRedux.Provider,
    { store: appStore },
    React.createElement(Main, null)
), document.getElementById('react-app'));
//# sourceMappingURL=all.js.map
