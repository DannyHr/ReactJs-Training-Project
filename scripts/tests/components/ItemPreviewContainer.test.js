import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ItemPreviewContainer from '../../src/components/ItemPreviewContainer.jsx';

function setup(previewScreenState) {
    var storeInitialState = {
        app: {
            isPreviewScreenShown: previewScreenState,
            previewScreenCurrentItem: { id: 1, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 }
        }
    };

    var store = configureStore()(storeInitialState);

    var enzymeWrapper = mount(
        <Provider store={store}>
            <ItemPreviewContainer />
        </Provider>
    );

    return {
        enzymeWrapper: enzymeWrapper
    };
}


describe('ItemPreviewContainer component', function () {
    it('should render self when its variable in the store is set to true', function () {
        var enzymeWrapper = setup(true).enzymeWrapper;

        expect(enzymeWrapper.find('.item-preview-screen').exists()).toBe(true);

        expect(enzymeWrapper.find('#item-preview-item-container').exists()).toBe(true);

        expect(enzymeWrapper.find('#item-preview-item-container .item-name').exists()).toBe(true);

        expect(enzymeWrapper.find('#item-preview-item-container .item-image-container').exists()).toBe(true);

        expect(enzymeWrapper.find('#item-preview-item-container .item-description').exists()).toBe(true);

        expect(enzymeWrapper.find('#item-preview-item-container .item-price').exists()).toBe(true);

        expect(enzymeWrapper.find('#item-preview-item-container .item-add-cart').exists()).toBe(true);

        expect(enzymeWrapper.find('#item-preview-item-container .close-btn').exists()).toBe(true);
    });

    it('should NOT render self when its variable in the store is set to false', function () {
        var enzymeWrapper = setup(false).enzymeWrapper;

        expect(enzymeWrapper.find('.item-preview-screen').exists()).toBe(false);

        expect(enzymeWrapper.find('#item-preview-item-container').exists()).toBe(false);
    });
});