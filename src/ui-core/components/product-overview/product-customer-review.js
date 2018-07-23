import React from 'react';
import {PRO, CON, OVERALL} from '../../constants/text-constants';

function getCommonSection(title, review, overallRating) {
    return (
        <div className='card-body'>
            {getStars(overallRating)}
            <h5 className='card-title'>{title}</h5>
            <p className='card-text'>{review}</p>
        </div>
    )
}

function getProductNegativeReview(customerReview) {
    const proCustomerReview = customerReview[0].Con[0];
    const title = proCustomerReview.title;
    const review = proCustomerReview.review;
    const overallRating = proCustomerReview.overallRating;

    return (
        <div className='reviews-section'>
            <div className='card w-30'>
                <div className='card-title'>
                    <h5>{CON}</h5>
                    <hr></hr>
                </div>
                {getCommonSection(title, review, overallRating)}
            </div>
        </div>
    )
}

function getProductPositiveReview(customerReview) {
    const proCustomerReview = customerReview[0].Pro[0];
    const title = proCustomerReview.title;
    const review = proCustomerReview.review;
    const overallRating = proCustomerReview.overallRating;

    return (
        <div className='reviews-section'>
            <div className='card w-30'>
                <div className='card-title'>
                    <h5>{PRO}</h5>
                    <hr></hr>
                </div>
                {getCommonSection(title, review, overallRating)}
            </div>
        </div>
    )
}

function getSpanTag() {
    return(
        <span className="fa fa-star checked"></span>
    )
}

function getStars(overAllReview) {
    let overAllStarsToDisplay = [];

    for (let i = 0; i < overAllReview; i++) {
        overAllStarsToDisplay.push(getSpanTag())
    }
    return overAllStarsToDisplay;
}

function getOverAllRating(customerReview) {
    const overAllReview = customerReview[0].consolidatedOverallRating;
    const viewAllReviews = customerReview[0].totalReviews;
    const viewAllReviewsText = 'View all' + `${viewAllReviews}` + 'reviews';

    return (
        <section>
            {getStars(overAllReview)}
            <span className='label label-default'>{OVERALL}</span>
            <a href='#' className='badge badgeReviews'>{viewAllReviewsText}</a>
        </section>
    )
}

export default function ProductCustomerReview(props) {
    const customerReview = props.productData[0].CustomerReview;

    return (
        <section>
            {getOverAllRating(customerReview)}
            <div className='col-lg-6'>
                <div className='row'>
                    {getProductPositiveReview(customerReview)}
                    {getProductNegativeReview(customerReview)}
                </div>
            </div>
        </section>
    )
}