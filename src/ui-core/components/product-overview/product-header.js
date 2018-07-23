import React from 'react';

export default function ProductHeader(productData) {
    const productTitle = productData[0].title;

    return (
        <div className="text-center">
            <h2>{productTitle}</h2>
        </div>
    )
}
