var STRINGS = {
    'view-more': 'View More',
    'currency': 'BGN'
}

var ItemListEntity = createReactClass({
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
        return (
            <li className='item' onClick={this.changeItem} >
                <h3 className='item-name'>{this.props.name}</h3>
                <div className='item-description'>{this.props.description}</div>
                <div className='item-price'>{this.props.price + ' ' + STRINGS['currency']}</div>
                <a href={'products/' + this.props.id} className='item-link'>{STRINGS['view-more']}</a>
            </li >
        )
    }
});

var ItemsList = createReactClass({
    propTypes: {
        items: PropTypes.array.isRequired,
        changeCurrentItem: PropTypes.func.isRequired,
        togglePreviewVisibility: PropTypes.func.isRequired,
    },
    render: function () {
        var self = this;
        var elementsToRender = self.props.items.map(function (item) {
            return (
                <ItemListEntity {...item} changeCurrentItem={self.props.changeCurrentItem} togglePreviewVisibility={self.props.togglePreviewVisibility} key={item.id} />
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

var ItemPreviewContainer = createReactClass({
    propTypes: {
        item: PropTypes.object.isRequired,
        isShown: PropTypes.bool.isRequired
    },
    getDefaultProps: function () {
        return {
            item: {},
            isShown: false
        }
    },
    render: function () {
        if (this.props.isShown) {
            return (
                <div className='item-preview-screen fullscreen-popup'>
                    <h2 className='item-name'>{this.props.item.name}</h2>
                    <div className='item-description'>{this.props.item.description}</div>
                    <div className='item-price'>{this.props.item.price + ' ' + STRINGS['currency']}</div>
                    <a href={'products/' + this.props.item.id} className='item-link'>{STRINGS['view-more']}</a>
                </div>
            );
        }
        else {
            return <div className='item-preview-screen fullscreen-popup' />;
        }
    }
});

var HomePageView = createReactClass({
    getInitialState: function () {
        return {
            currentItem: {},
            allItems: items,
            isPreviewShown: false
        }
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
        return (
            <div id='home-page'>
                <ItemsList {...{ items: this.state.allItems, changeCurrentItem: this.changeCurrentItem, togglePreviewVisibility: this.togglePreviewVisibility }} />
                <ItemPreviewContainer item={this.state.currentItem} togglePreviewVisibility={this.togglePreviewVisibility} isShown={this.state.isPreviewShown} />
            </div>
        )
    }
});

var Header = createReactClass({
    render: function () {
        return (
            <header id="header-container">
                <h1>Welcome!</h1>
            </header>
        )
    }
});


/**
 * Data
 */
var items = [
    { id: 1, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 },
    { id: 2, name: "Jacket", description: "Brand new jacket", price: 75.50 },
    { id: 3, name: "Car", description: "Brand new car", price: 7750 },
    { id: 4, name: "Watch", description: "Brand new watch", price: 110.99 },
];

ReactDOM.render(
    <div id="wrapper">
        <Header />
        <HomePageView />
    </div>,
    document.getElementById('react-app')
);

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