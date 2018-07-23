import React from 'react';
import {expect} from 'chai';
import ProductPickUpAndAddToCartButton
    from '../../../../../src/ui-core/components/product-overview/product-pickup-cart';

import {shallow} from 'enzyme';
import {ADD_TO_CART, PICK_UP_IN_STORE} from "../../../../../src/ui-core/constants/text-constants";

function whenComponentIsRendered(props) {
    return shallow(<ProductPickUpAndAddToCartButton {...props}/>);
}

function givenExpectedProps(purchasingChannelCode) {
    return {
        productData: [
            {
                purchasingChannelCode
            }
        ]
    }
}

describe('Feature: Product pick up cart Component', () => {
    const purchasingChannelCode = '0';
    const props = givenExpectedProps(purchasingChannelCode);

    const renderedComponent = whenComponentIsRendered(props);

    it('should render a div', () => {
        expect(renderedComponent.type()).to.equal('div');
        expect(renderedComponent.props().className).to.equal('col-lg-12');
    });

    it('should render a pick your in store and add to cart buttons', () => {
        const marketing = renderedComponent.childAt(0);
        const inStoreButtonElement = marketing.props().children[1];
        const pickupInStoreButtonElement = marketing.props().children[0];

        expect(marketing.type()).to.equal('div');
        expect(marketing.props().className).to.equal('row');

        expect(inStoreButtonElement.props.type).to.equal('button');
        expect(inStoreButtonElement.props.className).to.equal('btn btn-danger cart-buttons');
        expect(inStoreButtonElement.props.onClick).to.be.an('function');
        expect(inStoreButtonElement.props.children).to.equal(ADD_TO_CART);

        expect(pickupInStoreButtonElement.props.type).to.equal('button');
        expect(pickupInStoreButtonElement.props.className).to.equal('btn btn-dark cart-buttons');
        expect(pickupInStoreButtonElement.props.children).to.equal(PICK_UP_IN_STORE);
    });

    it('should only render a pick your in store button', () => {
        const props = givenExpectedProps('2');

        const renderedComponent = whenComponentIsRendered(props);

        const marketing = renderedComponent.childAt(0);
        const inStoreButtonElement = marketing.props().children[1];
        const pickupInStoreButtonElement = marketing.props().children[0];

        expect(marketing.type()).to.equal('div');
        expect(marketing.props().className).to.equal('row');

        expect(inStoreButtonElement).to.equal(null);

        expect(pickupInStoreButtonElement.props.type).to.equal('button');
        expect(pickupInStoreButtonElement.props.className).to.equal('btn btn-dark cart-buttons');
        expect(pickupInStoreButtonElement.props.onClick).to.be.an('function');
        expect(pickupInStoreButtonElement.props.children).to.equal(PICK_UP_IN_STORE);
    });

    it('should only render add to cart button', () => {
        const props = givenExpectedProps('1');

        const renderedComponent = whenComponentIsRendered(props);

        const marketing = renderedComponent.childAt(0);
        const inStoreButtonElement = marketing.props().children[1];
        const pickupInStoreButtonElement = marketing.props().children[0];

        expect(marketing.type()).to.equal('div');
        expect(marketing.props().className).to.equal('row');

        expect(pickupInStoreButtonElement).to.equal(null);

        expect(inStoreButtonElement.props.type).to.equal('button');
        expect(inStoreButtonElement.props.className).to.equal('btn btn-danger cart-buttons');
        expect(inStoreButtonElement.props.children).to.equal(ADD_TO_CART);
    });

    it('should NOT render a pick your in store button and add to cart buttons when purchasing channel code is not zero', () => {
        const props = givenExpectedProps('3');

        const renderedComponent = whenComponentIsRendered(props);

        const marketing = renderedComponent.childAt(0);
        const inStoreButtonElement = marketing.props().children[1];
        const pickupInStoreButtonElement = marketing.props().children[0];

        expect(marketing.type()).to.equal('div');
        expect(marketing.props().className).to.equal('row');

        expect(inStoreButtonElement).to.equal(null);

        expect(pickupInStoreButtonElement).to.equal(null);
    });
});
