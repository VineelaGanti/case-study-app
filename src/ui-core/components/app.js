import '../../../sass/main.scss';

import React from "react";
import Product from './product-overview/product';

function App(props) {
    return (
        <Product {...props}/>
    )
}

export default App;