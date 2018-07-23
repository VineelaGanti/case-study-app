import React from 'react';
import {expect} from 'chai';
import QuantityButton from '../../../../../src/ui-core/components/product-overview/product-quantity-button';
import CounterInput from '../../../../../src/ui-core/components/product-overview/product-counter-input';

import {shallow} from 'enzyme';
import Chance from 'chance';

const chance = new Chance;

function whenComponentIsRendered() {
    return shallow(<QuantityButton/>);
}

describe('Feature: Product quantity Component', () => {
    const renderedComponent = whenComponentIsRendered();

    it('should render a div', () => {
        expect(renderedComponent.type()).to.equal('div');
        expect(renderedComponent.props().className).to.equal('quantity-button');
    });

    it('should render a quantity input button', () => {
        const quantityInputButtons = renderedComponent.childAt(0);

        expect(quantityInputButtons.type()).to.equal(CounterInput);
        expect(quantityInputButtons.props()).to.deep.include({
            "glyphMinus": {
                "glyph": "fa fa-minus",
                "position": "right"
            },
            "glyphPlus": {
                "glyph": "fa fa-plus",
                "position": "left"
            },
            "value": "1"
        });

        expect(quantityInputButtons.props().onChange).to.be.an('function');

    });
});
