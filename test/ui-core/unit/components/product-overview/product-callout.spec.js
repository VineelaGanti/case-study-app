import React from 'react';
import {expect} from 'chai';
import ProductCallOut from '../../../../../src/ui-core/components/product-overview/product-callout';

import {shallow} from 'enzyme';
import Chance from 'chance';

const chance = new Chance;

function whenComponentIsRendered(props) {
    return shallow(<ProductCallOut {...props}/>);
}

function givenExpectedProps(props, expectedShortDescription) {
    return Object.freeze({
        Promotions: [
            {
                promotionIdentifier: chance.guid(),
                Description: [{
                    shortDescription: expectedShortDescription
                }
                ]
            }
        ],
        ...props
    });
}

describe('Feature: Product Call out Component', () => {
    let expectedShortDescription = chance.string();
    const props = givenExpectedProps({}, expectedShortDescription);
    const renderedComponent = whenComponentIsRendered(props);

    it('should render a div', () => {
        expect(renderedComponent.type()).to.equal('div');
    });

    it('should render a horizontal line', () => {
        const horizontalLine = renderedComponent.childAt(0);

        expect(horizontalLine.type()).to.equal('div');
        expect(horizontalLine.props().className).to.equal('hr');

        expect(horizontalLine.props().children.type).to.equal('hr');
    });

    it('should render a promotion detail cards', () => {
        const promotionDetailCardComponent = renderedComponent.childAt(1);

        expect(promotionDetailCardComponent.type()).to.equal('div');
        expect(promotionDetailCardComponent.props().className).to.equal('p-2 bd-highlight');

        const productCallOutList = promotionDetailCardComponent.props().children;

        expect(productCallOutList.type).to.equal('ul');
        expect(productCallOutList.props.className).to.equal('product-callout');

        const productCallOutListItems = productCallOutList.props.children[0];
        const expectedKeyIdentifier = props.Promotions[0].promotionIdentifier;

        expect(productCallOutListItems.type).to.equal('li');
        expect(productCallOutListItems.key).to.equal(expectedKeyIdentifier);
        expect(productCallOutListItems.props.className).to.equal('promotion-list');

        const promotionCards = productCallOutListItems.props.children;

        expect(promotionCards.type).to.equal('span');
        expect(promotionCards.props.className).to.equal('fa fa-tag');
        expect(promotionCards.props.children).to.equal(expectedShortDescription);
    });
});
