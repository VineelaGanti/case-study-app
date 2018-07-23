import {combineReducers} from 'redux';
import staticData from '../dux/static-data/catalog-view';

const appReducer = combineReducers({
    staticData
});

export default function (state, action) {
    return appReducer(state, action);
}