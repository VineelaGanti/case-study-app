export default function mapProductData(product) {
    const {
        title,
        Images,
        CustomerReview,
        purchasingChannelCode,
        shortDescription,
        itemId,
        ItemDescription,
        Promotions,
        Offers,
        ReturnPolicy
    } = product;

    return {
        title,
        purchasingChannelCode,
        shortDescription,
        itemId,
        ItemDescription,
        Images,
        CustomerReview,
        Promotions,
        Offers,
        ReturnPolicy
    };
}