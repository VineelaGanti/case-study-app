import React from 'react';

import ProductHeader from './product-header';
import ProductImageCarousal from './product-image-carousal';

export default function ProductDetails(props) {
    const {productData} = props;

    return (
        <section className='product-section'>
            <ProductHeader {...productData}/>
            <ProductImageCarousal {...productData} />
        </section>
    );
}