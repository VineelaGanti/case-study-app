import React from 'react';
import {expect} from 'chai';
import ProductHeader
    from '../../../../../src/ui-core/components/product-overview/product-header';
import Chance from 'chance';

const chance = new Chance;

import {shallow} from 'enzyme';

function whenComponentIsRendered(props) {
    return shallow(<ProductHeader {...props}/>);
}

function givenExpectedProps(title) {
    return [{
        title
    }]
}

describe('Feature: Product Header Component', () => {
    const title = chance.string();

    const props = givenExpectedProps(title);
    const renderedComponent = whenComponentIsRendered(props);

    it('should render a div', () => {
        expect(renderedComponent.type()).to.equal('div');
        expect(renderedComponent.props().className).to.equal('text-center');
    });

    it('should render a product title', () => {
        const productHighlights = renderedComponent.props().children;

        expect(productHighlights.type).to.equal('h2');
        expect(productHighlights.props.children).to.equal(title);
    });
});
