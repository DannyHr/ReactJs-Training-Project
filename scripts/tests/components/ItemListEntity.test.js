import React from 'react';
import { mount } from 'enzyme';
import ItemListEntity from '../../src/components/ItemListEntity.jsx';

var item = { id: 1, name: 'Mobile Phone', description: 'Brand new mobile phone', price: 750 };

function setup() {
    var enzymeWrapper = mount(
        <ItemListEntity item={item} />
    )

    return {
        enzymeWrapper: enzymeWrapper
    }
}


describe('ItemListEntity component', function () {
    it('should render self', function () {
        var enzymeWrapper = setup().enzymeWrapper;

        expect(enzymeWrapper.find('li.item').exists()).toBe(true);

        expect(enzymeWrapper.find('li.item .item-name').exists()).toBe(true);

        expect(enzymeWrapper.find('li.item .item-description').exists()).toBe(true);

        expect(enzymeWrapper.find('li.item .item-image-container').exists()).toBe(true);

        expect(enzymeWrapper.find('li.item .item-price').exists()).toBe(true);

        expect(enzymeWrapper.find('li.item .item-link').exists()).toBe(true);

        expect(enzymeWrapper.find('li.item .item-add-cart').exists()).toBe(true);
    });
});