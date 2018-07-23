import React from 'react';
import {expect} from 'chai';
import ProductDetails
    from '../../../../../src/ui-core/components/product-overview/product-details';
import ProductHeader
    from '../../../../../src/ui-core/components/product-overview/product-header';
import ProductImageCarousal
    from '../../../../../src/ui-core/components/product-overview/product-image-carousal';
import Chance from 'chance';

const chance = new Chance;

import {shallow} from 'enzyme';

function whenComponentIsRendered(props) {
    return shallow(<ProductDetails {...props}/>);
}

describe('Feature: Product Header Component', () => {
    const purchasingChannelCode = chance.string();
    const props = {
        productData: {
            purchasingChannelCode
                }
        };
    const renderedComponent = whenComponentIsRendered(props);

    it('should render a section', () => {
        expect(renderedComponent.type()).to.equal('section');
        expect(renderedComponent.props().className).to.equal('product-section');
    });

    it('should render a product header', () => {
        const productHeader = renderedComponent.props().children[0];

        expect(productHeader.type).to.equal(ProductHeader);
        expect(productHeader.props).to.deep.equal(props.productData);
    });

    it('should render a product image carousal', () => {
        const productImageCarousal = renderedComponent.props().children[1];

        expect(productImageCarousal.type).to.equal(ProductImageCarousal);
        expect(productImageCarousal.props).to.deep.equal(props.productData);
    });
});
