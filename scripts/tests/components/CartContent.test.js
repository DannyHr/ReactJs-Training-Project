import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import CartContent from '../../src/components/CartContent.jsx';

var storeInitialState = { header: { itemsInCart: [{ id: 1, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 }] } };

function setup() {
    var store = configureStore()(storeInitialState);
    var enzymeWrapper = mount(
        <Provider store={store}>
            <CartContent />
        </Provider >
    )

    return {
        enzymeWrapper: enzymeWrapper
    }
}

describe('CartContent component', function () {
    it('should render self and subcomponents', function () {
        var enzymeWrapper = setup().enzymeWrapper;

        expect(enzymeWrapper.find('ul').hasClass('items-list')).toBe(true);

        expect(enzymeWrapper.find('CartItem').exists()).toBe(true);
    });
});