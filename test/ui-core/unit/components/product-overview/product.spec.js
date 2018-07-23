
import React from 'react';
import {expect} from 'chai';
import Product from '../../../../../src/ui-core/components/product-overview/product';
import ProductDetails from '../../../../../src/ui-core/components/product-overview/product-details';
import ProductOffer from '../../../../../src/ui-core/components/product-overview/product-offer';
import QuantityButton from '../../../../../src/ui-core/components/product-overview/product-quantity-button';
import ProductReturns from '../../../../../src/ui-core/components/product-overview/product-returns';
import ProductPickUpAndAddToCartButton from '../../../../../src/ui-core/components/product-overview/product-pickup-cart';
import ProductAddToResitryAndListAndShare from '../../../../../src/ui-core/components/product-overview/product-add-to-registry-list-share';
import ProductHighlights from '../../../../../src/ui-core/components/product-overview/product-highlights';
import ProductCustomerReview from '../../../../../src/ui-core/components/product-overview/product-customer-review';
import {shallow} from 'enzyme';

describe('Feature: Product Component', () => {
    const props = Object.freeze({
        productData: {}
    });

    const product = shallow(<Product {...props}/>);

    const productDetailsRow = product.props().children[0];
    const productDetailColumn = productDetailsRow.props.children[1];
    const productDetailsRender = productDetailColumn.props.children[0];
    const productDetailsQuantityComponent = productDetailColumn.props.children[1];
    const productPickupAddToCartButton = productDetailColumn.props.children[2];
    const productReturnsComponent = productDetailColumn.props.children[3];
    const productAddToResitryAndListAndShare = productDetailColumn.props.children[4];
    const productHighlights = productDetailColumn.props.children[5];

    it('should render a div', () => {
        expect(product.type()).to.equal('div');
        expect(product.props().className).to.equal('container');
    });

    it('should render a div for row', () => {
        expect(productDetailsRow.type).to.equal('div');
        expect(productDetailsRow.props.className).to.equal('row');
    });

    it('should render a div inside row', () => {
        expect(productDetailColumn.type).to.equal('div');
        expect(productDetailColumn.props.className).to.equal('col-lg-6');
    });

    it('should have an ProductDetails component', () => {
        const productDetails = productDetailsRow.props.children[0];
        const productDetailsRender = productDetails.props.children;

        expect(productDetails.type).to.equal('div');
        expect(productDetails.props.className).to.equal('col-lg-6');
        
        expect(productDetailsRender.type).to.equal(ProductDetails);
        expect(productDetailsRender.props).to.deep.equal(props);
    });

    it('should have an ProductOffer component', () => {
        expect(productDetailsRender.type).to.equal(ProductOffer);
        expect(productDetailsRender.props).to.deep.equal(props);
    });

    it('should have an QuantityButton component', () => {
        expect(productDetailsQuantityComponent.type).to.equal(QuantityButton);
    });

    it('should have ProductPickUpAndAddToCartButton component', () => {
        expect(productPickupAddToCartButton.type).to.equal(ProductPickUpAndAddToCartButton);
        expect(productPickupAddToCartButton.props).to.deep.equal(props);
    });

    it('should have productReturnsComponent component', () => {
        expect(productReturnsComponent.type).to.equal(ProductReturns);
        expect(productReturnsComponent.props).to.deep.equal(props);
    });

    it('should have ProductAddToResitryAndListAndShare component', () => {
        expect(productAddToResitryAndListAndShare.type).to.equal(ProductAddToResitryAndListAndShare);
    });

    it('should have productHighlights component', () => {
        expect(productHighlights.type).to.equal(ProductHighlights);
        expect(productHighlights.props).to.deep.equal(props);
    });

    it('should have ProductCustomerReview component', () => {
        const productCustomerReview = product.props().children[1]

        expect(productCustomerReview.type).to.equal(ProductCustomerReview);
        expect(productCustomerReview.props).to.deep.equal(props);
    });
});
