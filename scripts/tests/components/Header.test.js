import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Header from '../../src/components/Header.jsx';

var storeInitialState = {
    header: {
        isCartContentContainerShown: false,
        itemsInCart: [{ id: 1, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 }]
    }
};

function setup() {
    var store = configureStore()(storeInitialState);

    var enzymeWrapper = mount(
        <Provider store={store}>
            <Header />
        </Provider >
    );

    return {
        enzymeWrapper: enzymeWrapper
    };
}

describe('Header component', function () {
    it('should render self and subcomponents', function () {
        var enzymeWrapper = setup().enzymeWrapper;

        expect(enzymeWrapper.find('header > div#header-wrapper').exists()).toBe(true);

        expect(enzymeWrapper.find('#header-navigation > #header-search').exists()).toBe(true);

        expect(enzymeWrapper.find('#header-navigation > #cart').exists()).toBe(true);

        expect(enzymeWrapper.find('CartContent').exists()).toBe(true);
    });
});