import {expect} from 'chai';
import App from '../../../../src/ui-core/components/app';
import Product from '../../../../src/ui-core/components/product-overview/product';
import {shallow} from 'enzyme';
import React from 'react';
import deepFreeze from 'deep-freeze';

function whenComponentIsRendered(props) {
    return shallow(<App {...props}/>);
}

describe('Scenario: App Container rendered with Product', () => {
    let renderedComponent,
        props;

    beforeEach(() => {
        props = deepFreeze({
            productData: {},
            children: {}
        });
        renderedComponent = whenComponentIsRendered(props);
    });

    it('should create a Product and pass along props', () => {
        expect(renderedComponent.type()).to.equal(Product);
        expect(renderedComponent.props()).to.deep.equal(props);
    });
});
