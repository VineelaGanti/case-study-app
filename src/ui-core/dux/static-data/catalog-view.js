import {combineReducers} from 'redux';
import {UNFETCHED} from '../../constants/ajax-status';
import {byId} from '../helpers';

const UPDATE_STATUS = 'catalogData/update';
const SET = 'catalogData/set';

function updateStatus(newStatus) {
    return {
        type: UPDATE_STATUS,
        newStatus
    };
}

function set(catalogDataArray) {
    return {
        type: SET,
        catalogData: catalogDataArray
    };
}

const actionCreators = {
    updateStatus,
    set
};

const DEFAULT_STATE = {};

function applyById(state = DEFAULT_STATE, action) {
    if (action.type === SET) {
       return action.catalogData
    }

    return state;
}

function applyStatus(state = UNFETCHED, action) {
    if (action.type === UPDATE_STATUS) {
        return action.newStatus;
    }

    return state;
}

export default combineReducers({
    byId: applyById,
    status: applyStatus
});

function getProductCollection(state) {
    return state.staticData;
}

function getProduct(state) {
    return byId(getProductCollection(state));
}

export {
    actionCreators,
    getProduct
};
