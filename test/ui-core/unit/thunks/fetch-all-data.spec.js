import {actionCreators as dataActions} from '../../../../src/ui-core/dux/static-data/catalog-view';
import fetchData from '../../../../src/ui-core/thunks/fetch-all-data';
import {expect} from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import {FETCHED, FETCHING} from '../../../../src/ui-core/constants/ajax-status';
import * as productMapper from '../../../../src/ui-core/mappers/map-product-data';
import * as productService from '../../../../src/ui-core/services/static-data';
import deepFreeze from 'deep-freeze';
import {restore} from '../helpers';

const sandbox = sinon.sandbox.create();
const chance = new Chance();
const fakeState = Symbol('fakeState');

function getJsonData() {
    return {
        CatalogEntryView: [
            Symbol('mapped products')
        ],
        [chance.word()]: chance.string()
    };
}

describe('Feature: Fetch All Json Data Thunk', () => {
    afterEach(restore(sandbox));

    describe('Scenario: Action thunk invoked', () => {
        let dispatch;

        beforeEach(() => {
            const action = fetchData();
            dispatch = sandbox.stub();
            action(dispatch, () => fakeState);
        });

        it('should dispatch an update status action with FETCHING status', () => {
            expect(dispatch.callCount).to.equal(3);
            expect(dispatch.firstCall.args).to.deep.equal([
                dataActions.updateStatus(FETCHING)
            ]);
        });
    });

    describe('Scenario: Action resolves successfully', () => {
        let dispatch,
            jsonData,
            mappedProductData,
            productServiceStub;

        beforeEach(() => {
            jsonData = deepFreeze(getJsonData());
            mappedProductData = Object.freeze(chance.n(() => Symbol('mapped products'), jsonData.length));

            const action = fetchData();

            const mapProductDataStub = sandbox.stub(productMapper, 'default');
            productServiceStub = sandbox.stub(productService, 'default').returns(jsonData);

            jsonData.CatalogEntryView.forEach((product, index) => {
                mapProductDataStub.withArgs(product).returns(mappedProductData[index]);
            });

            dispatch = sandbox.stub();

            action(dispatch);
        });

        it('should dispatch three times', () => {
            expect(dispatch.callCount).to.equal(3);
        });

        it('should dispatch action to set mapped products', () => {
            const setDispatchCallArgs = dispatch.secondCall.args;

            expect(setDispatchCallArgs).to.deep.equal([
                dataActions.set(mappedProductData)
            ]);
        });

        it('should dispatch update status action with FETCHED status', () => {
            const finalDispatchCall = dispatch.thirdCall;

            expect(finalDispatchCall.args).to.deep.equal([
                dataActions.updateStatus(FETCHED)
            ]);
        });
    });
});
