import React from 'react';
import ProductDetails from './product-details';
import ProductHighlights from './product-highlights';
import ProductOffer from './product-offer';
import ProductPickUpAndAddToCartButton from './product-pickup-cart';
import ProductCustomerReview from './product-customer-review';
import ProductAddToResitryAndListAndShare from './product-add-to-registry-list-share';
import QuantityButton from './product-quantity-button';
import ProductReturns from './product-returns';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <ProductDetails {...props}/>
                    </div>
                    <div className="col-lg-6">
                        <ProductOffer {...props} />
                        <QuantityButton />
                        <ProductPickUpAndAddToCartButton {...props} />
                        <ProductReturns {...props} />
                        <ProductAddToResitryAndListAndShare/>
                        <ProductHighlights {...props} />
                    </div>
                </div>
                <ProductCustomerReview {...props} />
            </div>
        )
    }
}
