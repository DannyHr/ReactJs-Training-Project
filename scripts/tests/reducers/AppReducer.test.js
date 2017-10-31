import appReducer from '../../src/store/AppReducer';
import { initialItems } from '../../src/store/AppReducer';
import { changeCurrentItem, togglePreviewScreen } from '../../src/actions/actionCreators.js';

describe('App Reducer', function () {
    var initialState = {
        allItems: initialItems,
        previewScreenCurrentItem: {},
        isPreviewScreenShown: false
    };

    it('should return the initial state', function () {
        expect(appReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CHANGE_CURRENT_ITEM action', function () {
        expect(appReducer(initialState, changeCurrentItem(0))).toEqual({
            allItems: initialItems,
            previewScreenCurrentItem: initialItems[0],
            isPreviewScreenShown: false
        });
    });

    it('should handle TOGGLE_PREVIEW_SCREEN action', function () {
        expect(appReducer(initialState, togglePreviewScreen(true))).toEqual({
            allItems: initialItems,
            previewScreenCurrentItem: {},
            isPreviewScreenShown: true
        });
    });
});