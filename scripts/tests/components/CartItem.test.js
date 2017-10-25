import React from 'react';
import { mount } from 'enzyme';
import CartItem from '../../src/components/CartItem.jsx';

function setup() {
    var item = { id: 1, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 };

    var enzymeWrapper = mount(<CartItem item={item} />);

    return {
        enzymeWrapper: enzymeWrapper
    }
}

describe('CartItem component', function () {
    it('should render self', function () {
        var enzymeWrapper = setup().enzymeWrapper;

        expect(enzymeWrapper.find('li').hasClass('item')).toBe(true);

        expect(enzymeWrapper.find('li > span').hasClass('item-link')).toBe(true);

        expect(enzymeWrapper.find('li > span > h3').hasClass('item-name')).toBe(true);

        expect(enzymeWrapper.find('li > span > h3').text()).toBe('Mobile Phone');

        expect(enzymeWrapper.find('li > span > .item-price').text()).toBe('750.00 BGN');
    });
});