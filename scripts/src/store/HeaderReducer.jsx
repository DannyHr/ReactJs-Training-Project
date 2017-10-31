import { GLOBALS } from '../../src/common/constants.js';
import * as ACTIONS from '../../src/actions/actionTypes.js';

var headerReducer = function (state, action) {
    switch (action.type) {
        case ACTIONS.ADD_ITEM_TO_CART:
            var newItem = action.newItem;
            var newArray = state.itemsInCart.concat(newItem);

            var itemAlreadyInCart = state.itemsInCart.find(function (item) { return newItem.id == item.id; });

            if (!itemAlreadyInCart) {
                return Object.assign({}, state, {
                    itemsInCart: newArray
                });
            } else {
                return state;
            }
        case ACTIONS.REMOVE_ITEM_FROM_CART:
            var newArray = state.itemsInCart.filter(function (item) { return item.id != action.idToRemove; });

            return Object.assign({}, state, {
                itemsInCart: newArray
            });
        case ACTIONS.TOGGLE_CART_CONTENT_CONTAINER:
            return Object.assign({}, state, {
                isCartContentContainerShown: action.newState
            });
        default:
            return state || {
                itemsInCart: [],
                isCartContentContainerShown: false,
            };
    }
};

export default headerReducer;