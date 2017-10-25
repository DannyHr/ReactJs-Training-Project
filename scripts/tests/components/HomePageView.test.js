import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import HomePageView from '../../src/components/HomePageView.jsx';

var storeInitialState = {
    app: { homePageAllItems: [{ id: 1, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 }] }
};

function setup() {
    var store = configureStore()(storeInitialState);

    var enzymeWrapper = mount(
        <Provider store={store}>
            <HomePageView />
        </Provider>
    )

    return {
        enzymeWrapper: enzymeWrapper
    }
}


describe('HomePageView component', function () {
    it('should render self and subcomponents', function () {
        var enzymeWrapper = setup().enzymeWrapper;

        expect(enzymeWrapper.find('#home-page').exists()).toBe(true);

        expect(enzymeWrapper.find('ItemsList').exists()).toBe(true);

        expect(enzymeWrapper.find('.items-list-container').exists()).toBe(true);
        
        expect(enzymeWrapper.find('.items-list-container > .items-list').exists()).toBe(true);
    });
});