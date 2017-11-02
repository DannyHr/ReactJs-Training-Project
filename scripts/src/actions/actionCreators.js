import * as ACTIONS from './actionTypes.js';

export function addItemToCart(item) {
    return {
        type: ACTIONS.ADD_ITEM_TO_CART,
        newItem: item
    };
};

export function removeItemFromCart(idToRemove) {
    return {
        type: ACTIONS.REMOVE_ITEM_FROM_CART,
        idToRemove: idToRemove
    };
};

export function toggleCartContentContainer(newState) {
    return {
        type: ACTIONS.TOGGLE_CART_CONTENT_CONTAINER,
        newState: newState
    };
};

export function changeCurrentPreviewItem(newItem) {
    return {
        type: ACTIONS.CHANGE_CURRENT_PREVIEW_ITEM,
        newItem: newItem
    };
};

export function togglePreviewScreen(newState) {
    return {
        type: ACTIONS.TOGGLE_PREVIEW_SCREEN,
        newState: newState
    };
};

export function loginUser(userData) {
    return {
        type: ACTIONS.LOGIN_USER,
        userData: userData
    };
};

export function logoutUser() {
    return {
        type: ACTIONS.LOGOUT_USER
    };
};

export function addItemToAllItems(itemOrItemsToAdd) {
    return {
        type: ACTIONS.ADD_ITEM_TO_ALLITEMS,
        itemOrItemsToAdd: itemOrItemsToAdd
    };
}

export function updateAllItems(newAllItems) {
    return {
        type: ACTIONS.UPDATE_ALLITEMS,
        newAllItems: newAllItems
    };
}

export function addToSearchResults(itemsToAdd) {
    return {
        type: ACTIONS.ADD_TO_SEARCH_RESULTS,
        itemsToAdd: itemsToAdd
    };
}

export function cleanSearchResults() {
    return {
        type: ACTIONS.CLEAN_SEARCH_RESULTS
    };
}