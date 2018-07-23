import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './dux';
import createDebounce from 'redux-debounced';

export default function initializeStore(initialState) {
    const middleware = applyMiddleware(createDebounce(), thunk);
    const store = createStore(reducers, initialState, middleware);

    return store;
}
