import React from 'react';
import {expect} from 'chai';
import ProductReturns from '../../../../../src/ui-core/components/product-overview/product-returns';

import {shallow} from 'enzyme';
import Chance from 'chance';

const chance = new Chance;

function whenComponentIsRendered(props) {
    return shallow(<ProductReturns {...props}/>);
}

function givenExpectedProps(props, expectedLegalCopy) {
    return Object.freeze({
        productData: [
            {
                ReturnPolicy: [{
                    legalCopy: expectedLegalCopy
                }
                ]
            }
        ],
        ...props
    });
}

describe('Feature: Product Returns Component', () => {
    let expectedLegalCopy = chance.string();
    const props = givenExpectedProps({}, expectedLegalCopy);
    const renderedComponent = whenComponentIsRendered(props);

    it('should render a div', () => {
        expect(renderedComponent.type()).to.equal('div');
    });

    it('should render a policy card', () => {
        const returnPolicyCards = renderedComponent.childAt(0);

        expect(returnPolicyCards.type()).to.equal('div');

        const renderReturnPolicy = returnPolicyCards.props();

        expect(renderReturnPolicy.children).to.equal(expectedLegalCopy);
    });
});
