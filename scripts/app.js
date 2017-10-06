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
                { href: 'products/' + this.props.id, className: 'item-link' },
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
        isShown: PropTypes.bool.isRequired
    },
    getDefaultProps: function () {
        return {
            item: {},
            isShown: false
        };
    },
    render: function () {
        if (this.props.isShown) {
            return React.createElement(
                'div',
                { className: 'item-preview-screen fullscreen-popup' },
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
                    { href: 'products/' + this.props.item.id, className: 'item-link' },
                    STRINGS['view-more']
                )
            );
        } else {
            return React.createElement('div', { className: 'item-preview-screen fullscreen-popup' });
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
var items = [{ id: 1, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }, { id: 2, name: "Jacket", description: "Brand new jacket", price: 75.50 }, { id: 3, name: "Car", description: "Brand new car", price: 7750 }, { id: 4, name: "Watch", description: "Brand new watch", price: 110.99 }];

ReactDOM.render(React.createElement(
    'div',
    { id: 'wrapper' },
    React.createElement(Header, null),
    React.createElement(HomePageView, null)
), document.getElementById('react-app'));

// var ContactItem = React.createClass({
//     propTypes: {
//         name: React.PropTypes.string.isRequired,
//         email: React.PropTypes.string.isRequired,
//         desc: React.PropTypes.string,
//     },
//     render: function () {
//         return (
//             React.createElement('li', { className: 'contact-item' },
//                 React.createElement('h2', { className: 'contact-item-name' }, this.props.name),
//                 React.createElement('a', { href: 'mailto:' + this.props.email, className: 'contact-item-email' }, this.props.email),
//                 React.createElement('div', { className: 'contact-item-description' }, this.props.desc)
//             )
//         )
//     }
// });

// var ContactForm = React.createClass({
//     propTypes: {
//         contact: React.PropTypes.object.isRequired
//     },
//     render: function () {
//         return (
//             React.createElement('form', {},
//                 React.createElement('input', { type: 'text', placeholder: 'Name (required)', value: this.props.contact.name }),
//                 React.createElement('input', { type: 'text', placeholder: 'Email', value: this.props.contact.email }),
//                 React.createElement('textarea', { placeholder: 'Description', value: this.props.contact.description }),
//                 React.createElement('button', { type: 'submit' }, 'Add Contact')
//             )
//         )
//     }
// });

// var ContactView = React.createClass({
//     propTypes: {
//         contacts: React.PropTypes.array.isRequired,
//         newContact: React.PropTypes.object.isRequired
//     },
//     render: function () {
//         var elementToRender =
//             this.props.contacts
//                 .filter(function (contact) { return contact.email; })
//                 .map(function (contact) { return React.createElement(ContactItem, contact); });
//         var newContact = this.props.newContact;

//         return (
//             React.createElement('div', {className: 'contact-view'},
//                 React.createElement('h1', {className: 'contact-view-title'}, "Contacts"),
//                 React.createElement('ul', {className: 'contact-view-list'}, elementToRender),
//                 React.createElement(ContactForm, { contact: newContact })
//             )
//         );
//     }
// })

// var contacts = [
//     { key: 1, name: "James Nelson", email: "james@jamesknelson.com", desc: "Front-end Unicorn" },
//     { key: 2, name: "Bob" },
//     { key: 3, name: "James Nelson 2", email: "james@jamesknelson.com", desc: "Front-end Unicorn 2" },
//     { key: 4, name: "James Nelson 3", desc: "Front-end Unicorn 3" }
// ];

// var newContact = { name: '', email: '', description: '' };

// ReactDOM.render(
//     React.createElement(ContactView, {
//         contacts: contacts,
//         newContact: newContact
//     }),
//     document.getElementById('react-app')
// );