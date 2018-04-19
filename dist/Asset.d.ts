import BigNumber from '../libs/bignumber';
export interface IAssetJSON {
    readonly ticker?: string;
    readonly id: string;
    readonly name: string;
    readonly precision: number;
    readonly description: string;
    readonly height: number;
    readonly timestamp: Date;
    readonly sender: string;
    readonly quantity: BigNumber;
    readonly reissuable: boolean;
}
export declare class Asset {
    readonly ticker: string | null;
    readonly id: string;
    readonly name: string;
    readonly precision: number;
    readonly description: string;
    readonly height: number;
    readonly timestamp: Date;
    readonly sender: string;
    readonly quantity: BigNumber;
    readonly reissuable: boolean;
    constructor(assetObject: IAssetJSON);
    toJSON(): IAssetJSON;
    toString(): string;
    static isAsset(object: object): object is Asset;
}
