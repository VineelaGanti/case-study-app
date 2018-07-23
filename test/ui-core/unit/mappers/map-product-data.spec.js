import mapProductData from '../../../../src/ui-core/mappers/map-product-data';
import {givenProduct} from '../helpers';
import Chance from 'chance';
import {expect} from 'chai';

const chance = new Chance();

describe('Feature: Product Mapper', () => {
    describe('Scenario: Map product from service', () => {
        const expectedProduct = givenProduct();
        const mappedProduct = mapProductData(Object.freeze({
            ...expectedProduct,
            [chance.string()]: chance.string()
        }));

        it('should only map desired tasks to a new object', () => {
            expect(mappedProduct).to.deep.equal(
                expectedProduct
            );
        });
    });
});