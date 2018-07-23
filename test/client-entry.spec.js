import {expect} from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const sandbox = sinon.sandbox.create();

proxyquire.noCallThru();

describe('Scenario: client-entry', () => {
    let initStub;

    beforeEach('Given setup', () => {
        // Given initializer stub
        initStub = sandbox.stub();

        proxyquire('../client-entry', {
            './src/ui-core/index': initStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call client init with correct args', () => {
        expect(initStub.callCount).to.equal(1);
        expect(initStub.firstCall.args).to.deep.equal([
            {
                staticData: {}
            }
        ]);
    });
});
