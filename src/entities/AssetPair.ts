import { Asset } from './Asset';

export interface IAssetPairJSON {
  amountAsset: string;
  priceAsset: string;
}

export class AssetPair {
  public readonly amountAsset: Asset;
  public readonly priceAsset: Asset;
  public readonly precisionDifference: number;

  constructor(amountAsset: Asset, priceAsset: Asset) {
    this.amountAsset = amountAsset;
    this.priceAsset = priceAsset;
    this.precisionDifference =
      this.priceAsset.precision - this.amountAsset.precision;
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
