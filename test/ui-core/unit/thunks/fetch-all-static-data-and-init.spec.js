
import {expect} from 'chai';
import sinon from 'sinon';
import proxyThunk from '../../../../src/ui-core/thunks/fetch-all-static-data-and-init';

describe('Fetch all static data and init state thunk', () => {
    describe('Scenario: Happy path all static data fetch success', () => {
        let dispatchStub,
            state;

        beforeEach('Setup:', () => {
            dispatchStub = sinon.stub();

            state = Symbol('fake state');

            proxyThunk()(dispatchStub);
        });

        it('should dispatch correctly', () => {
            //then
            const fetchAllDataDispatchStub = dispatchStub.firstCall.args[0];

            expect(dispatchStub.callCount).to.equal(1);
            expect(fetchAllDataDispatchStub).to.be.an('function');
        });
    });
});