import {expect} from 'chai';
import staticData from '../../../../src/ui-core/dux/static-data/catalog-view';
import initializeStore from '../../../../src/ui-core/initialize-store';

function getDefaultState(reducer) {
    return reducer(undefined, {});
}

describe('Feature: Main reducer', () => {
    describe('Scenario: Initializing a store', () => {
        // when
        const state = initializeStore().getState();

        it('should setup initial state', () => {
            expect(state.staticData).to.deep.equal(getDefaultState(staticData));
        });
    });
});