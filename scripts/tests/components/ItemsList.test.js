import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ItemsList from '../../src/components/ItemsList.jsx';

var storeInitialState = {
    app: { allItems: [{ id: 1, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 }] }
};

function setup() {
    var store = configureStore()(storeInitialState);

    var enzymeWrapper = mount(
        <Provider store={store}>
            <ItemsList />
        </Provider>
    );

    return {
        enzymeWrapper: enzymeWrapper
    };
}


describe('ItemListEntity component', function () {
    it('should render self', function () {
        var enzymeWrapper = setup().enzymeWrapper;

        expect(enzymeWrapper.find('.items-list-container').exists()).toBe(true);

        expect(enzymeWrapper.find('ul.items-list').exists()).toBe(true);

        expect(enzymeWrapper.find('ItemListEntity').exists()).toBe(true);

        expect(enzymeWrapper.find('ul.items-list li.item').exists()).toBe(true);
    });
});