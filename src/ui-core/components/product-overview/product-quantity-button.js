import React from 'react';
import CounterInput from './product-counter-input';

export default function QuantityButton() {
    return (
        <div className="quantity-button">
            <CounterInput
                glyphPlus={{glyph: 'fa fa-plus', position: 'left'}}
                glyphMinus={{glyph: 'fa fa-minus', position: 'right'}}
                value="1"
                onChange={(value) => {
                }}
            />
        </div>
    )
}
