import fetchAllData from './fetch-all-data';

export default function () {
    return (dispatch) => {
        dispatch(fetchAllData());
    };
}
