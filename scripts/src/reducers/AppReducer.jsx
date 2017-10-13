var appReducer = function (state, action) {
    switch (action.type) {
        case ACTIONS.CHANGE_CURRENT_ITEM:
            return Object.assign({}, state, {
                previewScreenCurrentItem: state.homePageAllItems[action.newItemIndex]
            });
        case ACTIONS.TOGGLE_PREVIEW_SCREEN:
            return Object.assign({}, state, {
                isPreviewScreenShown: action.newState
            });
        default:
            return state || {
                homePageAllItems: initialItems,
                previewScreenCurrentItem: {},
                isPreviewScreenShown: false
            };
    }
}