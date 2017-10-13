var Header = createReactClass({
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
        
        var newState = !(state.isCartContentContainerShown);

        store.dispatch({
            type: ACTIONS.TOGGLE_CART_CONTENT_CONTAINER,
            newState: newState
        });
    },
    render: function () {
        var store = this.context.store;
        var state = store.getState().header;

        console.log('Render Header');

        return (
            <header id="header-container">
                <div id="header-wrapper">
                    <h1>{STRINGS.HEADER_WELCOME}</h1>
                    <nav id="header-navigation">
                        <div id="cart" onClick={this.toggleCartContentContainer}>&#128722;
                            <div id="cart-content-container" className={'' + (state.isCartContentContainerShown ? '' : 'hidden')}>
                                <CartContent />
                            </div>
                        </div>
                        <div id="nav-menu">&#9776;</div>
                    </nav>
                </div>
            </header>
        )
    }
});
