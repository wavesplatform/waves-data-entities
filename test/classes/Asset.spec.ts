import { expect } from 'chai';
import { getAssetData } from '../assetData';
import { Asset } from '../../dist';


let defaultAssetInfo1;
let defaultAssetInfo2;


describe('Asset', () => {

    beforeEach(() => {

        defaultAssetInfo1 = getAssetData({
            id: 'test1',
            name: 'Test No. 1',
            precision: 0,
            reissuable: false,
            hasScript: true,
            minSponsoredFee: 100000
        });

        defaultAssetInfo2 = getAssetData({
            ticker: 'TN2',
            id: 'test2',
            name: 'Test No. 2',
            precision: 8,
            reissuable: true,
            hasScript: false,
            minSponsoredFee: 1
        });

    });

    describe('creating instances', () => {

        it('should be an instance of Asset #1', () => {
            const asset = new Asset(defaultAssetInfo1);
            expect(Asset.isAsset(asset)).to.be.true;
        });
        
        it('should be an instance of Asset #2', () => {
            const asset = new Asset(defaultAssetInfo2);
            expect(Asset.isAsset(asset)).to.be.true;
        });
    });

    describe('conversions', () => {

        // TODO : JSON

        it('should convert to a string #1', () => {
            const asset = new Asset(defaultAssetInfo1);
            expect(asset.toString()).to.equal(defaultAssetInfo1.id);
        });

        it('should convert to a string #2', () => {
            const asset = new Asset(defaultAssetInfo2);
            expect(asset.toString()).to.equal(defaultAssetInfo2.id);
        });

    });

});
