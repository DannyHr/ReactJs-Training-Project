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
                <a href={'?product=' + this.props.id} className='item-link'>{STRINGS['view-more']}</a>
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
        isShown: PropTypes.bool,
        togglePreviewVisibility: PropTypes.func.isRequired
    },
    getDefaultProps: function () {
        return {
            item: {},
            isShown: false
        }
    },
    hidePreview: function(){
        this.props.togglePreviewVisibility(false);
    },
    render: function () {
        if (this.props.isShown) {
            return (
                <div className='item-preview-screen fullscreen-popup'>
                    <div id="item-preview-item-container">
                        <h2 className='item-name'>{this.props.item.name}</h2>
                        <div className='item-description'>{this.props.item.description}</div>
                        <div className='item-price'>{this.props.item.price + ' ' + STRINGS['currency']}</div>
                        <a href={'?product=' + this.props.item.id} className='item-link'>{STRINGS['view-more']}</a>
                        <div className="close-btn" onClick={this.hidePreview}>&#215;</div>
                    </div>
                </div>
            );
        }
        else {
            return <div className='item-preview-screen fullscreen-popup hidden' />;
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
    { id: 5, name: "Car", description: "Brand new car", price: 7750 },
    { id: 6, name: "Watch", description: "Brand new watch", price: 110.99 },
    { id: 7, name: "Jacket", description: "Brand new jacket", price: 75.50 },
    { id: 8, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 },
];

ReactDOM.render(
    <div id="wrapper">
        <Header />
        <HomePageView />
    </div>,
    document.getElementById('react-app')
);