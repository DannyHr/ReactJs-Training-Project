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
        case ACTIONS.ADD_TO_SEARCH_RESULTS:
            var newArray = state.searchResultItems.concat(action.itemsToAdd);

            return Object.assign({}, state, {
                searchResultItems: newArray
            });
        case ACTIONS.CLEAN_SEARCH_RESULTS:
            var newArray = [];

            return Object.assign({}, state, {
                searchResultItems: newArray
            });
        default:
            return state || {
                allItems: [],
                searchResultItems: [],
                previewScreenCurrentItem: {},
                isPreviewScreenShown: false
            };
    }
};

export default appReducer;