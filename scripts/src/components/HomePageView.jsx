var HomePageView = createReactClass({
    componentDidMount() {
        var store = this.context.store;
        store.subscribe(() => {
            this.forceUpdate();
        });
    },
    render: function () {
        return (
            <div id='home-page'>
                <ItemsList />
                <ItemPreviewContainer />
            </div>
        )
    }
});

HomePageView.contextTypes = {
    store: PropTypes.object
}