import React from 'react';
import parser from 'html-react-parser';

function getReturnPolicyCards(returnPolicy) {
    return(
        <div>
            {parser(returnPolicy.legalCopy)}
        </div>
    )
}


export default function ProductReturns(props) {
    const returnPolicy = props.productData[0].ReturnPolicy[0];

    return (
        <div className="p-2 bd-highlight">
            {getReturnPolicyCards(returnPolicy)}
        </div>
    )
}