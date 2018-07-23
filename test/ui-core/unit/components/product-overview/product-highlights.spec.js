import React from 'react';
import {expect} from 'chai';
import ProductHighlights
    from '../../../../../src/ui-core/components/product-overview/product-highlights';
import Chance from 'chance';
import parser from 'html-react-parser';

const chance = new Chance;

import {shallow} from 'enzyme';
import {PRODUCT_HIGHLIGHTS} from "../../../../../src/ui-core/constants/text-constants";

function whenComponentIsRendered(props) {
    return shallow(<ProductHighlights {...props}/>);
}

function givenExpectedProps(productHighlight) {
    return {
        productData: [{
            ItemDescription: [{
                features: [
                    productHighlight
                ]
            }]
        }]
    }
}


describe('Feature: Product Highlights Component', () => {
    const productHighlight = chance.string();

    const props = givenExpectedProps(productHighlight);
    const renderedComponent = whenComponentIsRendered(props);

    it('should render a section', () => {
        expect(renderedComponent.type()).to.equal('section');
        expect(renderedComponent.props().className).to.equal('product-highlight');
    });

    it('should render a Product highlights', () => {
        const productHighlights = renderedComponent.props().children;

        expect(productHighlights.type).to.equal('div');

        expect(productHighlights.props.children[0].type).to.equal('h2');
        expect(productHighlights.props.children[0].props.className).to.equal('product-highlights');
        expect(productHighlights.props.children[0].props.children).to.equal(PRODUCT_HIGHLIGHTS);

        expect(productHighlights.props.children[1].type).to.equal('ul');
        expect(productHighlights.props.children[1].props.className).to.equal('list-group list-group-flush');
    });

    it('should render list of product highlights', () => {
        const productHighlight1 = chance.string();

        const productHighlights = [productHighlight1, productHighlight1];

        const props = {
            productData: [{
                ItemDescription: [{
                    features: productHighlights
                }]
            }]
        };

        const renderedComponent = whenComponentIsRendered(props);

        const productHighlightsComponent = renderedComponent.props().children;
        const productHighlightRenderNode = productHighlightsComponent.props.children[1];
        const productListNode = productHighlightRenderNode.props.children[1];

        productHighlights.forEach((productHighlight) => {
            expect(productListNode.type).to.equal('li');

            expect(productListNode.key).to.equal("1");
            expect(productListNode.props.children).to.equal(productHighlight);
        });
    });
});
