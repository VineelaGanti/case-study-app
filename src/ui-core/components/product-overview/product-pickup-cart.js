import React from 'react';
import {PICK_UP_IN_STORE, ADD_TO_CART} from '../../constants/text-constants';

function showAddToCartButton(isAvailableOnlineAndInStore) {
    if (isAvailableOnlineAndInStore === '0' || isAvailableOnlineAndInStore === '1') {
        return (
            <button
                type='button'
                className='btn btn-danger cart-buttons'
                onClick={() => {
                }}
            >
                {ADD_TO_CART}
            </button>
        )
    }
    return null;
}

function showPickUpInStoreButton(isAvailableOnlineAndInStore) {
    if (isAvailableOnlineAndInStore === '0' || isAvailableOnlineAndInStore === '2') {
        return (
            <button
                type='button'
                className='btn btn-dark cart-buttons'
                onClick={() => {
                }}
            >
                {PICK_UP_IN_STORE}
            </button>
        )
    }
    return null;
}

export default function ProductPickUpAndAddToCartButton(props) {
    const isAvailableOnlineAndInStore = props.productData[0].purchasingChannelCode;

    return (
        <div className='col-lg-12'>
            <div className='row'>
                {showPickUpInStoreButton(isAvailableOnlineAndInStore)}
                {showAddToCartButton(isAvailableOnlineAndInStore)}
            </div>
        </div>
    )
}