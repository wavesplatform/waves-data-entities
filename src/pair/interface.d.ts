import { IAsset } from '../asset/interface';

export interface IAssetPair {
    readonly amountAsset: IAsset;
    readonly priceAsset: IAsset;
    readonly precisionDifference: number;

    toJSON(): IAssetPairJSON;

    toString(): string;
}

export interface IAssetPairJSON {
    amountAsset: string;
    priceAsset: string;
}
