
import Chance from 'chance';
import CaseStudyProvider from '../../../src/ui-core/case-study-provider';
import {expect} from 'chai';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../../../src/ui-core/dux';
import AppContainer from '../../../src/ui-core/containers/app-container';

const chance = new Chance();

describe('Feature: Crop planner provider', () => {
    describe('Scenario: Should pass props to app container', () => {
        let caseStudyProviderInstance,
            props,
            store;

        beforeEach('Setup', () => {
            store = createStore(reducers);
            props = {
                [chance.string()]: chance.string(),
                store
            };

            caseStudyProviderInstance = new CaseStudyProvider(props);
        });
        it('should a provider', () => {
            expect(caseStudyProviderInstance.type).to.equal(Provider);
        });
        it('should pass store to provider', () => {
            const expectedStore = props.store;

            expect(caseStudyProviderInstance.props.store).to.equal(expectedStore);
        });
        it('should pass props to child router', () => {
            const providerChildren = caseStudyProviderInstance.props.children;

            expect(providerChildren.type).to.equal(AppContainer);
            expect(providerChildren.props).to.deep.equal(props);
        });
    });
});
