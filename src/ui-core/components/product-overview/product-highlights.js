import React from 'react';
import parser from 'html-react-parser';
import {PRODUCT_HIGHLIGHTS} from '../../constants/text-constants';

function mapProductHighlightsToListItems(productHighlights) {
    return productHighlights[0].features.map((productHighlight, index) => {
        return (
            <li
                key={index}
            >
                {parser(productHighlight)}
            </li>
        )
    });
}

function getProductHighlights(productHighlights) {
    return (
        <div>
            <h2 className='product-highlights'>{PRODUCT_HIGHLIGHTS}</h2>
            <ul className='list-group list-group-flush'>
                {mapProductHighlightsToListItems(productHighlights)}
            </ul>
        </div>
    )
}

export default function ProductHighlights(props) {
    const productHighlights = props.productData[0].ItemDescription;

    return (
        <section className='product-highlight'>
            {getProductHighlights(productHighlights)}
        </section>
    );
}