var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var STRINGS = {
    'view-more': 'View More',
    'currency': 'BGN'
};

var ItemListEntity = createReactClass({
    displayName: 'ItemListEntity',

    propTypes: {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        changeCurrentItem: PropTypes.func.isRequired,
        togglePreviewVisibility: PropTypes.func.isRequired
    },
    changeItem: function () {
        this.props.changeCurrentItem(this.props);
        this.props.togglePreviewVisibility(true);
    },
    render: function () {
        return React.createElement(
            'li',
            { className: 'item', onClick: this.changeItem },
            React.createElement(
                'h3',
                { className: 'item-name' },
                this.props.name
            ),
            React.createElement(
                'div',
                { className: 'item-description' },
                this.props.description
            ),
            React.createElement(
                'div',
                { className: 'item-price' },
                this.props.price + ' ' + STRINGS['currency']
            ),
            React.createElement(
                'a',
                { href: '?product=' + this.props.id, className: 'item-link' },
                STRINGS['view-more']
            )
        );
    }
});

var ItemsList = createReactClass({
    displayName: 'ItemsList',

    propTypes: {
        items: PropTypes.array.isRequired,
        changeCurrentItem: PropTypes.func.isRequired,
        togglePreviewVisibility: PropTypes.func.isRequired
    },
    render: function () {
        var self = this;
        var elementsToRender = self.props.items.map(function (item) {
            return React.createElement(ItemListEntity, _extends({}, item, { changeCurrentItem: self.props.changeCurrentItem, togglePreviewVisibility: self.props.togglePreviewVisibility, key: item.id }));
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

var ItemPreviewContainer = createReactClass({
    displayName: 'ItemPreviewContainer',

    propTypes: {
        item: PropTypes.object.isRequired,
        isShown: PropTypes.bool,
        togglePreviewVisibility: PropTypes.func.isRequired
    },
    getDefaultProps: function () {
        return {
            item: {},
            isShown: false
        };
    },
    hidePreview: function () {
        this.props.togglePreviewVisibility(false);
    },
    render: function () {
        if (this.props.isShown) {
            return React.createElement(
                'div',
                { className: 'item-preview-screen fullscreen-popup' },
                React.createElement(
                    'div',
                    { id: 'item-preview-item-container' },
                    React.createElement(
                        'h2',
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
                        this.props.item.price + ' ' + STRINGS['currency']
                    ),
                    React.createElement(
                        'a',
                        { href: '?product=' + this.props.item.id, className: 'item-link' },
                        STRINGS['view-more']
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

var HomePageView = createReactClass({
    displayName: 'HomePageView',

    getInitialState: function () {
        return {
            currentItem: {},
            allItems: items,
            isPreviewShown: false
        };
    },
    togglePreviewVisibility: function (newState) {
        this.setState({
            isPreviewShown: newState
        });
    },
    changeCurrentItem: function (item) {
        this.setState({
            currentItem: item
        });
    },
    addItem: function (item) {
        this.setState({
            allItems: this.state.allItems.concat([item])
        });
    },
    render: function () {
        return React.createElement(
            'div',
            { id: 'home-page' },
            React.createElement(ItemsList, { items: this.state.allItems, changeCurrentItem: this.changeCurrentItem, togglePreviewVisibility: this.togglePreviewVisibility }),
            React.createElement(ItemPreviewContainer, { item: this.state.currentItem, togglePreviewVisibility: this.togglePreviewVisibility, isShown: this.state.isPreviewShown })
        );
    }
});

var Header = createReactClass({
    displayName: 'Header',

    render: function () {
        return React.createElement(
            'header',
            { id: 'header-container' },
            React.createElement(
                'h1',
                null,
                'Welcome!'
            )
        );
    }
});

/**
 * Data
 */
var items = [{ id: 1, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }, { id: 2, name: "Jacket", description: "Brand new jacket", price: 75.50 }, { id: 3, name: "Car", description: "Brand new car", price: 7750 }, { id: 4, name: "Watch", description: "Brand new watch", price: 110.99 }, { id: 5, name: "Car", description: "Brand new car", price: 7750 }, { id: 6, name: "Watch", description: "Brand new watch", price: 110.99 }, { id: 7, name: "Jacket", description: "Brand new jacket", price: 75.50 }, { id: 8, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }];

ReactDOM.render(React.createElement(
    'div',
    { id: 'wrapper' },
    React.createElement(Header, null),
    React.createElement(HomePageView, null)
), document.getElementById('react-app'));