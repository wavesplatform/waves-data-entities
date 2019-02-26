import { BigNumber } from '../libs/bignumber';
import { config } from '../config';
import { toBigNumber } from '../utils';

export interface IAssetInfo {
    readonly ticker?: string;
    readonly id: string;
    readonly name: string;
    readonly precision: number;
    readonly description: string;
    readonly height: number;
    readonly timestamp: Date;
    readonly sender: string;
    readonly quantity: BigNumber | string | number;
    readonly reissuable: boolean;
    readonly hasScript?: boolean;
    readonly minSponsoredFee?: BigNumber | string | number;
}

export interface IAssetJSON extends IAssetInfo {
    readonly quantity: BigNumber;
    readonly minSponsoredFee?: BigNumber
}

export class Asset {
    public readonly ticker: string | null;

    public readonly id: string;
    public readonly name: string;
    public readonly precision: number;
    public readonly description: string;

    public readonly height: number;
    public readonly timestamp: Date;
    public readonly sender: string;
    public readonly quantity: BigNumber;
    public readonly reissuable: boolean;
    public readonly hasScript: boolean;
    public readonly minSponsoredFee: BigNumber | null;

    public readonly displayName: string;

    constructor(assetObject: IAssetInfo) {

        assetObject = config.get('remapAsset')(assetObject);

        this.quantity = toBigNumber(assetObject.quantity);
        this.minSponsoredFee = toBigNumber(assetObject.minSponsoredFee);

        this.ticker = assetObject.ticker || null;

        this.id = assetObject.id;
        this.name = assetObject.name;
        this.precision = assetObject.precision;
        this.description = assetObject.description;
        this.height = assetObject.height;
        this.timestamp = assetObject.timestamp;
        this.sender = assetObject.sender;
        this.reissuable = assetObject.reissuable;
        this.hasScript = assetObject.hasScript || false;
        this.displayName = assetObject.ticker || assetObject.name;
    }

    public toJSON(): IAssetJSON {
        return {
            ticker: this.ticker,
            id: this.id,
            name: this.name,
            precision: this.precision,
            description: this.description,
            height: this.height,
            timestamp: this.timestamp,
            sender: this.sender,
            quantity: this.quantity,
            reissuable: this.reissuable,
            hasScript: this.hasScript,
            minSponsoredFee: this.minSponsoredFee
        };
    }

    public toString(): string {
        return this.id;
    }

    public static isAsset(object: object): object is Asset {
        return object instanceof Asset;
    }
}
