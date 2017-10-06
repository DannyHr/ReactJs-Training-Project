var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var STRINGS = {
    'view-more': 'View More',
    'currency': 'BGN'
};

var ItemEntity = createReactClass({
    displayName: 'ItemEntity',

    propTypes: {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired
    },
    render: function () {
        return React.createElement(
            'li',
            { className: 'item' },
            React.createElement(
                'h2',
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
        items: PropTypes.array.isRequired
    },
    render: function () {
        var elementsToRender = this.props.items.map(function (item) {
            return React.createElement(ItemEntity, _extends({}, item, { key: item.id }));
        });

        return React.createElement(
            'div',
            { className: 'items-list-container' },
            React.createElement(
                'ul',
                { className: 'items-list' },
                elementsToRender
            )
        );
    }
});

var ItemPreviewScreen = createReactClass({
    displayName: 'ItemPreviewScreen',

    propTypes: {
        item: PropTypes.object.isRequired
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'item-preview-screen fullscreen-popup' },
            React.createElement(ItemEntity, this.props.item)
        );
    }
});

/**
 * Data
 */
var items = [{ id: 1, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }, { id: 2, name: "Jacket", description: "Brand new jacket", price: 75.50 }, { id: 3, name: "Car", description: "Brand new car", price: 7750 }, { id: 4, name: "Watch", description: "Brand new watch", price: 110.99 }];

ReactDOM.render(React.createElement(ItemsList, { items: items }), document.getElementById('react-app'));

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