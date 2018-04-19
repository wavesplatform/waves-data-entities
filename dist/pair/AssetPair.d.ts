import { Asset } from '..';
import { IAssetPairJSON } from './interface';
export declare class AssetPair {
    readonly amountAsset: Asset;
    readonly priceAsset: Asset;
    readonly precisionDifference: number;
    constructor(asset1: Asset, asset2: Asset);
    private _orderAssets(asset1, asset2);
    toJSON(): IAssetPairJSON;
    toString(): string;
    static isAssetPair(object: object): object is AssetPair;
}
