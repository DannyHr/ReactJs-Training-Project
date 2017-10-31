import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Home from '../../src/components/Home.jsx';

var storeInitialState = {
    app: {
        allItems: [{ id: 1, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 }],
        previewScreenCurrentItem: {},
        isPreviewScreenShown: false
    },
    header: {
        itemsInCart: [],
        isCartContentContainerShown: false
    }
};

function setup() {
    var store = configureStore()(storeInitialState);

    var enzymeWrapper = mount(
        <Provider store={store}>
            <Home />
        </Provider>
    );

    return {
        enzymeWrapper: enzymeWrapper
    };
}


describe('Home component', function () {
    it('should render self and subcomponents', function () {
        var enzymeWrapper = setup(true).enzymeWrapper;

        expect(enzymeWrapper.find('div#wrapper').exists()).toBe(true);

        expect(enzymeWrapper.find('Header').exists()).toBe(true);

        expect(enzymeWrapper.find('HomePageView').exists()).toBe(true);

        expect(enzymeWrapper.find('ItemPreviewContainer').exists()).toBe(true);
    });
});