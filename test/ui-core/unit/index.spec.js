
import proxyquire from 'proxyquire';
import {expect} from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import React from 'react';
import ReactDOM from 'react-dom';
import CaseStudyProvider from '../../../src/ui-core/case-study-provider';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

proxyquire.noCallThru();

describe('Feature: Initialize ui core', () => {
    describe('Scenario: Store is passed to case study app provider', () => {
        let initializeStoreDependency,
            fakeStore,
            createElementSpy,
            renderStub,
            uiCoreIndexProxy,
            props,
            mountPoint,
            initialState,
            dispatchFetchStaticDataStub,
            dispatchStub;

        afterEach('Cleanup mount point', () => {
            ReactDOM.unmountComponentAtNode(mountPoint);
            document.body.innerHTML = '';
            sandbox.restore();
        });
        beforeEach(() => {
            mountPoint = document.createElement('DIV');
            mountPoint.setAttribute('id', 'app-mount');
            document.body.appendChild(mountPoint);

            dispatchStub = sinon.stub();

            fakeStore = Object.freeze({
                [chance.string()]: chance.string(),
                dispatch: dispatchStub
            });

            createElementSpy = sandbox.spy(React, 'createElement');
            renderStub = sandbox.stub();
            initialState = Symbol('initial state');
            initializeStoreDependency = sinon.stub().withArgs(initialState).returns(fakeStore);

            props = Object.freeze({
                [chance.string()]: chance.string()
            });

            const fetchStaticDataAndInitStateStubReturn = chance.guid();
            const fetchStaticDataAndInitStateStub = sinon.stub().returns(fetchStaticDataAndInitStateStubReturn);

            dispatchFetchStaticDataStub = dispatchStub.withArgs(fetchStaticDataAndInitStateStubReturn);

            uiCoreIndexProxy = proxyquire('../../../src/ui-core', {
                'react': {
                    createElement: createElementSpy
                },
                'react-dom': {
                    render: renderStub
                },
                './initialize-store': initializeStoreDependency,
                './thunks/fetch-all-static-data-and-init': fetchStaticDataAndInitStateStub
            }).default;
        });
        
        beforeEach('When ui core initialized', async () => {
          await uiCoreIndexProxy(initialState, props);
        });

        it('should pass store with props', () => {
            const expectedProps = {
                ...props,
                store: fakeStore
            };
            const providerElement = renderStub.firstCall.args[0];

            expect(providerElement.type).to.equal(CaseStudyProvider);
            expect(providerElement.props).to.deep.equal(expectedProps);
            expect(renderStub.firstCall.args[1]).to.equal(mountPoint);
        });

        it('should dispatch fetch static data and initialize state', () => {
            expect(dispatchFetchStaticDataStub.callCount).to.equal(1);
        });
    });
});
