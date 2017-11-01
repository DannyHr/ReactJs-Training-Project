import headerReducer from '../../src/store/HeaderReducer';
import { ACTIONS } from '../../src/common/constants.js';
import { addItemToCart, removeItemFromCart, toggleCartContentContainer } from '../../src/actions/actionCreators.js';

describe('Header Reducer', function () {
    var initialState = {
        itemsInCart: [],
        isCartContentContainerShown: false
    };

    var dumpItems = [
        { id: 0, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 },
        { id: 1, name: 'Jacket', description: 'Brand new jacket', price: 75.50 },
        { id: 2, name: 'Car', description: 'Brand new car', price: 7750 }
    ];

    it('should return the initial state', function () {
        expect(headerReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_ITEM_TO_CART action', function () {
        expect(headerReducer(initialState, addItemToCart(dumpItems[1]))).toEqual({
            itemsInCart: [dumpItems[1]],
            isCartContentContainerShown: false,
        });
    });

    it('should ADD_ITEM_TO_CART when there are items inside already', function () {
        expect(headerReducer({
            itemsInCart: [dumpItems[0], dumpItems[1]],
            isCartContentContainerShown: false,
        }, addItemToCart(dumpItems[2]))).toEqual({
            itemsInCart: [dumpItems[0], dumpItems[1], dumpItems[2]],
            isCartContentContainerShown: false,
        });
    });

    it('should not ADD_ITEM_TO_CART when the same item is inside already', function () {
        expect(headerReducer({
            itemsInCart: [dumpItems[0], dumpItems[1]],
            isCartContentContainerShown: false,
        }, addItemToCart(dumpItems[1]))).toEqual({
            itemsInCart: [dumpItems[0], dumpItems[1]],
            isCartContentContainerShown: false,
        });
    });

    it('should REMOVE_ITEM_FROM_CART with item id 0', function () {
        var state = headerReducer(
            initialState,
            addItemToCart({ id: 0, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 }));

        expect(headerReducer(state, removeItemFromCart(0))).toEqual({
            itemsInCart: [],
            isCartContentContainerShown: false,
        });
    });

    it('should not REMOVE_ITEM_FROM_CART with a nonexistentstar id 1', function () {
        var itemToAdd = { id: 0, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 };
        var state = headerReducer(initialState, addItemToCart(itemToAdd));

        expect(headerReducer(state, removeItemFromCart(1))).toEqual({
            itemsInCart: [itemToAdd],
            isCartContentContainerShown: false,
        });
    });

    it('should handle TOGGLE_CART_CONTENT_CONTAINER action', function () {
        expect(headerReducer(initialState, toggleCartContentContainer(true))).toEqual({
            itemsInCart: [],
            isCartContentContainerShown: true
        });
    });
});