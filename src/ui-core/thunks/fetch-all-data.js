import {actionCreators as dataActions} from '../dux/static-data/catalog-view';
import {FETCHED, FETCHING} from '../constants/ajax-status';
import renderFromJson from '../services/static-data';
import mapProductData from '../mappers/map-product-data';

export default function fetchData() {
    return (dispatch) => {
        let givenJsonData;

        dispatch(dataActions.updateStatus(FETCHING));

        givenJsonData = renderFromJson();

        const mappedProductData = givenJsonData.CatalogEntryView.map(mapProductData);

        dispatch(dataActions.set(mappedProductData));
        dispatch(dataActions.updateStatus(FETCHED));
    };
}