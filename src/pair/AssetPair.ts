import { IAsset } from '../asset/interface';
import { IAssetPair } from './interface';


export class AssetPair implements IAssetPair {

    public readonly amountAsset: IAsset;
    public readonly priceAsset: IAsset;
    public readonly precisionDifference: number;

    constructor(amountAsset: IAsset, priceAsset: IAsset) {
        this.amountAsset = amountAsset;
        this.priceAsset = priceAsset;
        this.precisionDifference = priceAsset.precision - amountAsset.precision;
    }

    public toJSON() {
        return {
            amountAsset: this.amountAsset.id,
            priceAsset: this.priceAsset.id
        };
    }

    public toString() {
        return `${this.amountAsset}/${this.priceAsset}`;
    }
}
