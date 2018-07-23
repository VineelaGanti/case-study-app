import React from 'react';
import {expect} from 'chai';
import ProductImageCarousal
    from '../../../../../src/ui-core/components/product-overview/product-image-carousal';
import Chance from 'chance';
import {Carousel} from 'react-responsive-carousel';

const chance = new Chance;

import {shallow} from 'enzyme';

function whenComponentIsRendered(props) {
    return shallow(<ProductImageCarousal {...props}/>);
}

function givenExpectedProps(AlternateImages, PrimaryImage) {
    return [
        {
            Images: [
                {
                    AlternateImages,
                    PrimaryImage
                }
            ]
        }
    ]
}

function getPrimaryImage() {
    return {
        image: chance.string()
    }
}

describe('Feature: Product Image Carousal Component', () => {
    const PrimaryImage = chance.n(getPrimaryImage, 1);
    const AlternateImages = chance.n(getPrimaryImage, 4);

    const props = givenExpectedProps(AlternateImages, PrimaryImage);
    const renderedComponent = whenComponentIsRendered(props);

    it('should render a div', () => {
        expect(renderedComponent.type()).to.equal('div');
        expect(renderedComponent.props().className).to.equal('image-carousal');
    });

    it('should render a Carousel', () => {
        const carousalComponent = renderedComponent.props().children;

        expect(renderedComponent.type()).to.equal('div');
        expect(carousalComponent.type).to.equal(Carousel);
        expect(renderedComponent.props().className).to.equal('image-carousal');
    });

    it('should render list of images', () => {
        const AlternateImages = getPrimaryImage();
        const PrimaryImage = getPrimaryImage();
        const props = [{
            Images: [{
                AlternateImages,
                PrimaryImage
            }]
        }];

        const Images = [...PrimaryImage, ...AlternateImages]
        const renderedComponent = whenComponentIsRendered(props);

        Images.forEach((image) => {
            const carousalRender = renderedComponent.childAt(0);
            const carousalRenderNode = carousalRender.props().children[0];
            const expectedImage = image;

            expect(carousalRenderNode.type).to.equal('div');
            expect(carousalRenderNode.props.children.type).to.equal('img');
            expect(carousalRenderNode.props.children.props.src).to.equal(expectedImage.image);
        });
    });
});
