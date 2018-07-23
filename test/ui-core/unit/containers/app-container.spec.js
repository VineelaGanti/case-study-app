import sinon from 'sinon';
import {expect} from 'chai';
import {restore, loadConnectedComponent} from '../helpers';
import * as staticDataSelectors from '../../../../src/ui-core/dux/static-data/catalog-view';

const sandbox = sinon.sandbox.create();

describe('Feature: App Container', () => {
    const fakeState = Symbol('fake state');
    let mapStateToProps,
        expectedProductData;

    beforeEach(() => {
        const connectArguments = loadConnectedComponent('ui-core/containers/app-container', sandbox, {
            '../components/app': {
                '@noCallThru': true
            }
        });

        expectedProductData = Symbol('product data');
        sandbox.stub(staticDataSelectors, 'getProduct').returns(expectedProductData);
        mapStateToProps = connectArguments.mapStateToProps;
    });

    afterEach(restore(sandbox));

    describe('Scenario: Map state to props', () => {
        let mappedProps;

        beforeEach(() => {
            mappedProps = mapStateToProps(fakeState);
        });

        it('should map state to props', () => {
            const {productData} = mappedProps;

            expect(productData).to.equal(expectedProductData);
        });
    });
});
