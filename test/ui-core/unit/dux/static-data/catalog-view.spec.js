import reduce, {actionCreators, getProduct} from '../../../../../src/ui-core/dux/static-data/catalog-view';
import {expect} from 'chai';
import Chance from 'chance';
import {UNFETCHED} from '../../../../../src/ui-core/constants/ajax-status';
import deepFreeze from 'deep-freeze';

const chance = new Chance();

const DEFAULT_STATE = {
    byId: {},
    status: UNFETCHED
};

describe('Scenario: default state', () => {
    let nextState;

    beforeEach('When state is undefined', () => {
        nextState = reduce(undefined, Object.freeze({type: chance.string()}));
    });

    it('should return the default state', () => {
        expect(nextState).to.deep.equal(DEFAULT_STATE);
    });
});

describe('Scenario: unknown action', () => {
    let initialState,
        nextState;

    beforeEach('given populated state', () => {
        initialState = Object.freeze({
            byId: Symbol('fake byId'),
            status: Symbol('fake status')
        });
    });

    beforeEach('when reducer invoked', () => {
        nextState = reduce(initialState, Object.freeze({
            type: chance.string(),
            catalogData: Symbol('catalogData')
        }));
    });

    it('should return initial state', () => {
        expect(nextState).to.equal(initialState);
    });
});

describe('Scenario: set catalogData action', () => {
    let initialState,
        catalogData,
        nextState;

    function createCatalogData() {
        return Object.freeze({
            id: chance.guid(),
            [chance.string()]: chance.string()
        });
    }

    beforeEach('given state with catalogData', () => {
        initialState = deepFreeze({
            ...DEFAULT_STATE,
            byId: {
                [chance.natural()]: Symbol('initial catalog data')
            }
        });

        catalogData = Object.freeze(chance.n(createCatalogData, 2));

        const action = deepFreeze(actionCreators.set(catalogData));

        nextState = reduce(initialState, action);
    });

    it('should set the catalogData', () => {
        expect(nextState).to.deep.equal({
            byId: catalogData,
            status: UNFETCHED
        });
    });
});

describe('Scenario: update status', () => {
    let initialState,
        newStatus,
        nextState;

    beforeEach('given default state with status', () => {
        initialState = deepFreeze({
            ...DEFAULT_STATE,
            status: Symbol('initial status')
        });
    });

    beforeEach('when reducer invoked with update status action', () => {
        newStatus = Symbol('new status');
        const action = actionCreators.updateStatus(newStatus);

        nextState = reduce(initialState, action);
    });

    it('should update the status', () => {
        expect(nextState).to.deep.equal({
            ...initialState,
            status: newStatus
        });
    });
});

describe('Scenario: get product selector', () => {
    let state,
        productId,
        status,
        expectedProduct;

    beforeEach('Given state', () => {
        productId = chance.natural();
        expectedProduct = Symbol('product');
        status = Symbol('status');

        state = deepFreeze({
            staticData: {
                byId: {
                    expectedProduct
                },
                status
            }
        });
    });

    it('should have getProduct', () => {
        expect(getProduct(state)).to.deep.equal({expectedProduct});
    });
});

