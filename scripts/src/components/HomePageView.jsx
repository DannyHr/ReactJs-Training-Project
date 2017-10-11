var HomePageView = createReactClass({
    componentDidMount: function() {
        var store = this.context.store;
        store.subscribe(function () {
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