import React from 'react';
import {expect} from 'chai';
import ProductOffer
    from '../../../../../src/ui-core/components/product-overview/product-offer';
import ProductCallOut from '../../../../../src/ui-core/components/product-overview/product-callout';
import Chance from 'chance';

const chance = new Chance;

import {shallow} from 'enzyme';

function whenComponentIsRendered(props) {
    return shallow(<ProductOffer {...props}/>);
}

function givenExpectedProps(priceQualifier, formattedPriceValue) {
    return {
        productData: [
            {
                Offers: [
                    {
                        OfferPrice: [{
                            formattedPriceValue,
                            priceQualifier
                        }]
                    }
                ]
            }
        ]
    }
}

describe('Feature: Product offer Component', () => {
    const priceQualifier = chance.string();
    const formattedPriceValue = chance.string();

    const props = givenExpectedProps(priceQualifier, formattedPriceValue);

    const renderedComponent = whenComponentIsRendered(props);
    const renderedComponentNode = renderedComponent.props().children[0];

    it('should render a div', () => {
        expect(renderedComponent.type()).to.equal('div');

        const spanNode = renderedComponentNode.props.children[0];
        const priceQualifierSpanNode = renderedComponentNode.props.children[1];
        const priceValueNode = spanNode.props.children;

        expect(renderedComponentNode.type).to.equal('div');
        expect(renderedComponentNode.props.className).to.equal('product-inline');

        expect(spanNode.type).to.equal('span');
        expect(spanNode.props.className).to.equal('price-value');

        expect(priceValueNode.type).to.equal('h1');
        expect(priceValueNode.props.children.type).to.equal('strong');
        expect(priceValueNode.props.children.props.children).to.equal(formattedPriceValue);
        
        expect(priceQualifierSpanNode.type).to.equal('span');
        expect(priceQualifierSpanNode.props.className).to.equal('label label-default price-online');
        expect(priceQualifierSpanNode.props.children).to.equal(priceQualifier);
    });

    it('should render product callout component ', () => {
        const productCallOutDivNode = renderedComponent.props().children[1];
        const productCallOut = productCallOutDivNode.props.children[0];
        const horizontalLineBreakNode = productCallOutDivNode.props.children[1];

        expect(productCallOutDivNode.type).to.equal('div');
        expect(productCallOutDivNode.props.className).to.equal('d-flex flex-column bd-highlight mb-3 product-callout-width');
        expect(productCallOutDivNode.props.children[0].props).to.deep.equal(props.productData[0]);
        expect(productCallOut.type).to.deep.equal(ProductCallOut);

        expect(productCallOutDivNode.type).to.equal('div');
        expect(horizontalLineBreakNode.type).to.equal('div');
        expect(horizontalLineBreakNode.props.className).to.equal('hr');
        expect(horizontalLineBreakNode.props.children.type).to.equal('hr');
    });
});
