
import {Provider} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import AppContainer from './containers/app-container';

export default function CaseStudyProvider(props) {
    return (
        <Provider store={props.store}>
            <AppContainer {...props}>
            </AppContainer>
        </Provider>
    );
}

CaseStudyProvider.propTypes = {
    store: PropTypes.object.isRequired
};
