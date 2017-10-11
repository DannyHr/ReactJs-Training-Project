var ItemPreviewContainer = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
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
            return (
                <div className='item-preview-screen fullscreen-popup'>
                    <div id="item-preview-item-container">
                        <h2 className='item-name'>{state.previewScreenCurrentItem.name}</h2>
                        <div className='item-description'>{state.previewScreenCurrentItem.description}</div>
                        <div className='item-price'>{state.previewScreenCurrentItem.price + ' ' + STRINGS.CURRENCY}</div>
                        <a href={'#product=' + state.previewScreenCurrentItem.id} className='view-more-link'>{STRINGS.VIEW_MORE}</a>
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