import React from 'react';
import ProductCallOut from "./product-callout";

export function getHorizontalLine() {
    return (
        <div className="hr">
            <hr/>
        </div>
    )
}

export default function ProductOffer(props) {
    const offer = props.productData[0].Offers[0].OfferPrice[0];
    const productData = props.productData[0];
    const {formattedPriceValue, priceQualifier} = offer;

    return (
        <div>
            <div className='product-inline'>
                <span className='price-value'>
                    <h1><strong>{formattedPriceValue}</strong></h1>
                </span>
                <span className="label label-default price-online">
                    {priceQualifier}
                </span>
            </div>
            <div className='d-flex flex-column bd-highlight mb-3 product-callout-width'>
                <ProductCallOut {...productData}/>
                {getHorizontalLine()}
            </div>
        </div>
    )
}