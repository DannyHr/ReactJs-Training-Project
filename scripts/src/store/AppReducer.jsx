import * as ACTIONS from '../actions/actionTypes.js';

var appReducer = function (state, action) {
    switch (action.type) {
        case ACTIONS.CHANGE_CURRENT_ITEM:
            return Object.assign({}, state, {
                previewScreenCurrentItem: action.newItem
            });
        case ACTIONS.TOGGLE_PREVIEW_SCREEN:
            return Object.assign({}, state, {
                isPreviewScreenShown: action.newState
            });
        case ACTIONS.ADD_ITEM_TO_ALLITEMS:
            var newArray = state.allItems.concat(action.itemOrItemsToAdd);

            return Object.assign({}, state, {
                allItems: newArray
            });
        case ACTIONS.UPDATE_ALLITEMS:
            var newArray = action.newAllItems;

            return Object.assign({}, state, {
                allItems: newArray
            });
        default:
            return state || {
                allItems: [],
                previewScreenCurrentItem: {},
                isPreviewScreenShown: false
            };
    }
};

export default appReducer;