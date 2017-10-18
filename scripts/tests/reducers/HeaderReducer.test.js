import headerReducer from '../../src/reducers/HeaderReducer';
import { ACTIONS } from '../../src/common/constants.js';

describe('Header Reducer', function () {
    var initialState = {
        itemsInCart: [],
        isCartContentContainerShown: false
    };

    var dumpItems = [
        { id: 0, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 },
        { id: 1, name: "Jacket", description: "Brand new jacket", price: 75.50 },
        { id: 2, name: "Car", description: "Brand new car", price: 7750 }
    ];

    beforeAll(function () {
        class LocalStorageMock {
            constructor() {
                this.store = {};
            }

            clear() {
                this.store = {};
            }

            getItem(key) {
                return this.store[key] || null;
            }

            setItem(key, value) {
                this.store[key] = value.toString();
            }

            removeItem(key) {
                delete this.store[key];
            }
        };

        global.localStorage = new LocalStorageMock;
    });

    it('should return the initial state', function () {
        expect(headerReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_ITEM_TO_CART action', function () {
        expect(headerReducer(initialState, {
            type: ACTIONS.ADD_ITEM_TO_CART,
            newItem: dumpItems[1]
        })).toEqual({
            itemsInCart: [dumpItems[1]],
            isCartContentContainerShown: false,
        });
    });

    it('should ADD_ITEM_TO_CART when there are items inside already', function () {
        expect(headerReducer({
            itemsInCart: [dumpItems[0], dumpItems[1]],
            isCartContentContainerShown: false,
        }, {
                type: ACTIONS.ADD_ITEM_TO_CART,
                newItem: dumpItems[2]
            })).toEqual({
                itemsInCart: [dumpItems[0], dumpItems[1], dumpItems[2]],
                isCartContentContainerShown: false,
            });
    });

    it('should not ADD_ITEM_TO_CART when the same item is inside already', function () {
        expect(headerReducer({
            itemsInCart: [dumpItems[0], dumpItems[1]],
            isCartContentContainerShown: false,
        }, {
                type: ACTIONS.ADD_ITEM_TO_CART,
                newItem: dumpItems[1]
            })).toEqual({
                itemsInCart: [dumpItems[0], dumpItems[1]],
                isCartContentContainerShown: false,
            });
    });

    it('should REMOVE_ITEM_FROM_CART with item id 0', function () {
        var state = headerReducer(initialState, {
            type: ACTIONS.ADD_ITEM_TO_CART,
            newItem: { id: 0, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }
        });

        expect(headerReducer(state, {
            type: ACTIONS.REMOVE_ITEM_FROM_CART,
            idToRemove: 0
        })).toEqual({
            itemsInCart: [],
            isCartContentContainerShown: false,
        });
    });

    it('should not REMOVE_ITEM_FROM_CART with a nonexistentstar id 1', function () {
        var itemToAdd = { id: 0, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 }
        var state = headerReducer(initialState, {
            type: ACTIONS.ADD_ITEM_TO_CART,
            newItem: itemToAdd
        });

        expect(headerReducer(state, {
            type: ACTIONS.REMOVE_ITEM_FROM_CART,
            idToRemove: 1
        })).toEqual({
            itemsInCart: [itemToAdd],
            isCartContentContainerShown: false,
        });
    });

    it('should handle TOGGLE_CART_CONTENT_CONTAINER action', function () {
        expect(headerReducer(initialState, {
            type: ACTIONS.TOGGLE_CART_CONTENT_CONTAINER,
            newState: true
        })).toEqual({
            itemsInCart: [],
            isCartContentContainerShown: true
        });
    });
});