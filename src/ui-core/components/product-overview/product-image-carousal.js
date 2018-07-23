import React from 'react';
import {Carousel} from 'react-responsive-carousel';

function getCarousel(allImages) {
    return allImages.map(individualImage => {
        return (
            <div>
                <img src={individualImage.image}/>
            </div>
        )
    });
}

export default function ProductImageCarousal(props) {
    const alternateImages = props[0].Images[0].AlternateImages;
    const primaryImage = props[0].Images[0].PrimaryImage;
    const allImages = [...primaryImage, ...alternateImages];

    return (
        <div className='image-carousal'>
            <Carousel>
                {getCarousel(allImages)}
            </Carousel>
        </div>
    );
}