
import React from 'react';
import {expect} from 'chai';
import ProductAddToResitryAndListAndShare from '../../../../../src/ui-core/components/product-overview/product-add-to-registry-list-share';

import {shallow} from 'enzyme';
import {ADD_TO_LIST, ADD_TO_REGISTRY, SHARE} from "../../../../../src/ui-core/constants/text-constants";

describe('Feature: Product Add To Registry Component', () => {
    const productRegistrySection = shallow(<ProductAddToResitryAndListAndShare />);
    const productRegistryDivNode = productRegistrySection.props().children;

    const productAddToRegistry = productRegistryDivNode.props.children[0];
    const productAddToListButton = productRegistryDivNode.props.children[1];
    const shareButton = productRegistryDivNode.props.children[2];

    it('should render a div', () => {
        expect(productRegistrySection.type()).to.equal('div');

        expect(productRegistryDivNode.type).to.equal('div');
        expect(productRegistryDivNode.props.className).to.equal('row');

        expect(productAddToRegistry.type).to.equal('button');
        expect(productAddToRegistry.props.className).to.equal('btn btn-secondary listButtons');
        expect(productAddToRegistry.props.children).to.equal(ADD_TO_REGISTRY);
    });

    it('should render a ADD TO LIST button', () => {
        expect(productAddToListButton.type).to.equal('button');
        expect(productAddToListButton.props.className).to.equal('btn btn-secondary listButtons');
        expect(productAddToListButton.props.children).to.equal(ADD_TO_LIST);
    });

    it('should render a share button', () => {
        expect(shareButton.type).to.equal('button');
        expect(shareButton.props.className).to.equal('btn btn-secondary listButtons');
        expect(shareButton.props.children).to.equal(SHARE);
    });
});
