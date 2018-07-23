import React from 'react';
import {ADD_TO_REGISTRY, ADD_TO_LIST, SHARE} from '../../constants/text-constants';

export default function ProductAddToResitryAndListAndShare() {
    return (
        <div className='col-lg-12'>
            <div className='row'>
                <button
                    type='button'
                    className='btn btn-secondary listButtons'
                >
                    {ADD_TO_REGISTRY}
                </button>
                <button type='button'
                        className='btn btn-secondary listButtons'
                >
                    {ADD_TO_LIST}
                </button>
                <button type='button'
                        className='btn btn-secondary listButtons'
                >
                    {SHARE}
                </button>
            </div>
        </div>
    )
}
