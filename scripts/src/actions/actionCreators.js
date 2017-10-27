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

export function changeCurrentItem(newItemIndex) {
    return {
        type: ACTIONS.CHANGE_CURRENT_ITEM,
        newItemIndex: newItemIndex
    };
};

export function togglePreviewScreen(newState) {
    return {
        type: ACTIONS.TOGGLE_PREVIEW_SCREEN,
        newState: newState
    };
};