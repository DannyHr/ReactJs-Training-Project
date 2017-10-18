// var AppReducer = require('../../src/reducers/AppReducer');
// console.log(AppReducer);

import appReducer from '../../src/reducers/AppReducer';
import { initialItems } from '../../src/reducers/AppReducer';
import { ACTIONS } from '../../src/common/constants.js';

describe('App Reducer', function () {
    var initialState = {
        homePageAllItems: initialItems,
        previewScreenCurrentItem: {},
        isPreviewScreenShown: false
    };

    it('should return the initial state', function () {
        expect(appReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CHANGE_CURRENT_ITEM action', function () {
        expect(appReducer(initialState, {
            type: ACTIONS.CHANGE_CURRENT_ITEM,
            newItemIndex: 0
        })).toEqual({
            homePageAllItems: initialItems,
            previewScreenCurrentItem: initialItems[0],
            isPreviewScreenShown: false
        });
    });

    it('should handle TOGGLE_PREVIEW_SCREEN action', function () {
        expect(appReducer(initialState, {
            type: ACTIONS.TOGGLE_PREVIEW_SCREEN,
            newState: true
        })).toEqual({
            homePageAllItems: initialItems,
            previewScreenCurrentItem: {},
            isPreviewScreenShown: true
        });
    });
});