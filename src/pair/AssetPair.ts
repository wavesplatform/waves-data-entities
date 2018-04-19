import { Asset } from '..';
import { IAssetPairJSON } from './interface';

import orderPairs from '@waves/assets-pairs-order';
declare const console: any;
export class AssetPair {
    public readonly amountAsset: Asset;
    public readonly priceAsset: Asset;
    public readonly precisionDifference: number;

    constructor(asset1: Asset, asset2: Asset) {
        const pair = this._orderAssets(asset1, asset2);
        this.amountAsset = pair[0];
        this.priceAsset = pair[1];
        this.precisionDifference =
            this.priceAsset.precision - this.amountAsset.precision;
    }

    private _orderAssets(asset1: Asset, asset2: Asset): [Asset, Asset] {
        const pairIds = orderPairs(asset1.id, asset2.id)[0];
        console.log(pairIds);
        return asset1.id === pairIds[0] ? [asset1, asset2] : [asset2, asset1];
    }

    public toJSON(): IAssetPairJSON {
        return {
            amountAsset: this.amountAsset.id,
            priceAsset: this.priceAsset.id,
        };
    }

    public toString() {
        return `${this.amountAsset}/${this.priceAsset}`;
    }

    public static isAssetPair(object: object): object is AssetPair {
        return object instanceof AssetPair;
    }
}
