import {connect} from 'react-redux';

import App from '../components/app';
import {getProduct} from '../dux/static-data/catalog-view'

function mapStateToProps(state) {
    const productData = getProduct(state);

    return {
        productData
    };
}

export default connect(mapStateToProps)(App);
