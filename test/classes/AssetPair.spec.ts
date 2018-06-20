import { expect } from 'chai';
import { getAssetData } from '../assetData';
import { Asset, AssetPair } from '../../dist';


let asset1;
let asset2;


describe('AssetPair', () => {

    beforeEach(() => {

        asset1 = new Asset(getAssetData({
            id: 'test1',
            name: 'Test No. 1',
            precision: 0,
            reissuable: false
        }));

        asset2 = new Asset(getAssetData({
            ticker: 'TN2',
            id: 'test2',
            name: 'Test No. 2',
            precision: 4,
            reissuable: true
        }));

    });

    describe('creating instances', () => {

        it('should be an instance of AssetPair', () => {
            const assetPair = new AssetPair(asset1, asset2);
            expect(AssetPair.isAssetPair(assetPair)).to.be.true;
        });

    });

    describe('conversions', () => {

        // TODO : JSON

        it('should convert to a string', () => {
            const assetPair = new AssetPair(asset1, asset2);
            expect(assetPair.toString()).to.equal(`${asset1.id}/${asset2.id}`);
        });

    });

});
