import { Asset } from '../Asset';

export interface IAssetPairConstructor {
    new (asset1: Asset, asset2: Asset): IAssetPair;
    isAssetPair(object: object): object is IAssetPair;
}

export interface IAssetPair {
    readonly amountAsset: Asset;
    readonly priceAsset: Asset;
    readonly precisionDifference: number;

    toJSON(): IAssetPairJSON;
    toString(): string;
}

export interface IAssetPairJSON {
    amountAsset: string;
    priceAsset: string;
}
