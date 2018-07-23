import React from 'react';
import {expect} from 'chai';
import ProductCustomerReview from '../../../../../src/ui-core/components/product-overview/product-customer-review';
import Chance from 'chance';

const chance = new Chance;

import {shallow} from 'enzyme';

function givenProps(consolidatedOverallRating, totalReviews, title, review, overallRating) {
    return {
        productData: [{
            CustomerReview: [{
                Pro: [{
                    title,
                    review,
                    overallRating
                }],
                Con: [{
                    title,
                    review,
                    overallRating
                }],
                consolidatedOverallRating,
                totalReviews
            }
            ]
        }]
    }
}

describe('Feature: Product Customer Review Component', () => {
    const consolidatedOverallRating = 1;
    const totalReviews = " 2 ";
    const title = chance.string();
    const review = chance.string();
    const overallRating = 2;

    const props = givenProps(consolidatedOverallRating, totalReviews, title, review, overallRating);
    const productReviewSection = shallow(<ProductCustomerReview {...props} />);

    it('should render a section', () => {
        expect(productReviewSection.type()).to.equal('section');

        const reviewRatingNode = productReviewSection.props().children[0];
        const expectedReviewsText = 'View all' + `${totalReviews}` + 'reviews';
        const reviewStars = reviewRatingNode.props.children[0];

        expect(reviewRatingNode.type).to.equal('section');
        expect(reviewStars[0].type).to.deep.equal('span');
        expect(reviewStars[0].props.className).to.deep.equal('fa fa-star checked');

        expect(reviewRatingNode.props.children[1].type).to.equal('span');
        expect(reviewRatingNode.props.children[1].props.className).to.equal('label label-default');
        expect(reviewRatingNode.props.children[1].props.children).to.equal('overall');

        expect(reviewRatingNode.props.children[2].type).to.equal('a');
        expect(reviewRatingNode.props.children[2].props.href).to.equal('#');
        expect(reviewRatingNode.props.children[2].props.className).to.equal('badge badgeReviews');
        expect(reviewRatingNode.props.children[2].props.children).to.equal(expectedReviewsText);
    });

    it('should render a positive review section', () => {
        const positiveRatingNode = productReviewSection.props().children[1];

        expect(positiveRatingNode.type).to.equal('div');
        expect(positiveRatingNode.props.className).to.deep.equal('col-lg-6');

        const positiveReviewDivCard = positiveRatingNode.props.children;
        const positiveReviewDivCardSecondDiv = positiveReviewDivCard.props.children[0];

        expect(positiveReviewDivCard.type).to.equal('div');
        expect(positiveReviewDivCard.props.className).to.equal('row');

        expect(positiveReviewDivCardSecondDiv.type).to.equal('div');
        expect(positiveReviewDivCardSecondDiv.props.className).to.equal('reviews-section');

        expect(positiveReviewDivCardSecondDiv.props.children.type).to.equal('div');
        expect(positiveReviewDivCardSecondDiv.props.children.props.className).to.equal('card w-30');

        const cardTitleNode = positiveReviewDivCardSecondDiv.props.children.props.children;
        const commonSectionNode = positiveReviewDivCardSecondDiv.props.children.props.children[1];

        expect(cardTitleNode[0].type).to.equal('div');
        expect(cardTitleNode[0].props.className).to.equal('card-title');

        expect(cardTitleNode[0].props.children[0].type).to.equal('h5');
        expect(cardTitleNode[0].props.children[0].props.children).to.equal('PRO');
        expect(cardTitleNode[0].props.children[1].type).to.equal('hr');

        expect(commonSectionNode.type).to.equal('div');
        expect(commonSectionNode.props.className).to.equal('card-body');

        const [reviewStars] = commonSectionNode.props.children[0];

        expect(reviewStars.type).to.deep.equal('span');
        expect(reviewStars.props.className).to.deep.equal('fa fa-star checked');

        expect(commonSectionNode.props.children[1].type).to.equal('h5');
        expect(commonSectionNode.props.children[1].props.className).to.equal('card-title');
        expect(commonSectionNode.props.children[1].props.children).to.equal(title);

        expect(commonSectionNode.props.children[2].type).to.equal('p');
        expect(commonSectionNode.props.children[2].props.className).to.equal('card-text');
        expect(commonSectionNode.props.children[2].props.children).to.equal(review);

        const negativeReviewDivCard = positiveReviewDivCard.props.children[1];
        const negativeReviewDivCardSecondDiv = negativeReviewDivCard.props.children;

        expect(negativeReviewDivCardSecondDiv.type).to.equal('div');
        expect(negativeReviewDivCardSecondDiv.props.className).to.equal('card w-30');

        const cardTitleNodeNegative = negativeReviewDivCardSecondDiv.props.children;
        const commonSectionNodeNegative = negativeReviewDivCardSecondDiv.props.children[1];

        expect(cardTitleNodeNegative[0].type).to.equal('div');
        expect(cardTitleNodeNegative[0].props.className).to.equal('card-title');

        expect(cardTitleNodeNegative[0].props.children[0].type).to.equal('h5');
        expect(cardTitleNodeNegative[0].props.children[0].props.children).to.equal('CON');
        expect(cardTitleNodeNegative[0].props.children[1].type).to.equal('hr');

        expect(commonSectionNodeNegative.type).to.equal('div');
        expect(commonSectionNodeNegative.props.className).to.equal('card-body');
        const [reviewStarForNegative] = commonSectionNodeNegative.props.children[0];

        expect(reviewStarForNegative.type).to.deep.equal('span');
        expect(reviewStarForNegative.props.className).to.deep.equal('fa fa-star checked');

        expect(commonSectionNodeNegative.props.children[1].type).to.equal('h5');
        expect(commonSectionNodeNegative.props.children[1].props.className).to.equal('card-title');
        expect(commonSectionNodeNegative.props.children[1].props.children).to.equal(title);

        expect(commonSectionNodeNegative.props.children[2].type).to.equal('p');
        expect(commonSectionNodeNegative.props.children[2].props.className).to.equal('card-text');
        expect(commonSectionNodeNegative.props.children[2].props.children).to.equal(review);
    });
});
