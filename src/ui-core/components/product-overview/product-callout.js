import React from 'react';
import {getHorizontalLine} from './product-offer';

function mapPromotionToListItems(promotions) {
    return promotions.map(promotion => {
        return (
            <li
                key={promotion.promotionIdentifier}
                className='promotion-list'
            >
                <span className="fa fa-tag">{promotion.Description[0].shortDescription}</span>
            </li>
        )
    });
}

function getPromotionDetailCards(promotions) {
    return (
        <ul className='product-callout'>
            {mapPromotionToListItems(promotions)}
        </ul>
    );
}

export default function ProductCallOut(props) {
    const promotions = props.Promotions;

    return (
        <div>
            {getHorizontalLine()}
            <div className="p-2 bd-highlight">
                {getPromotionDetailCards(promotions)}
            </div>
        </div>
    )
}