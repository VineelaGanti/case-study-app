import React from 'react';
import ReactDOM from 'react-dom';
import CaseStudyProvider from './case-study-provider';
import initializeStore from './initialize-store';
import fetchStaticDataAndInitState from './thunks/fetch-all-static-data-and-init';

export default async (initialState, props) => {
    const store = initializeStore(initialState);

    const propsWithStore = {
        ...props,
        store
    };

    await store.dispatch(fetchStaticDataAndInitState());

    const element = React.createElement(CaseStudyProvider, propsWithStore);

    ReactDOM.render(element, document.getElementById('app-mount'));
};
