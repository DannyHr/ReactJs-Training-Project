var HomePageView = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
    componentDidMount: function() {
        var store = this.context.store;
        var self = this;
        store.subscribe(function () {
            self.forceUpdate();
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