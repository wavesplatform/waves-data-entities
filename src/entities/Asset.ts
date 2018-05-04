import { BigNumber } from '../libs/bignumber';

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
}

export interface IAssetJSON extends IAssetInfo {
    readonly quantity: BigNumber;
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

    constructor(assetObject: IAssetInfo) {
        this.quantity =
            assetObject.quantity instanceof BigNumber
                ? assetObject.quantity
                : new BigNumber(assetObject.quantity);

        this.ticker = assetObject.ticker || null;

        this.id = assetObject.id;
        this.name = assetObject.name;
        this.precision = assetObject.precision;
        this.description = assetObject.description;
        this.height = assetObject.height;
        this.timestamp = assetObject.timestamp;
        this.sender = assetObject.sender;
        this.reissuable = assetObject.reissuable;
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
        };
    }

    public toString(): string {
        return this.id;
    }

    public static isAsset(object: object): object is Asset {
        return object instanceof Asset;
    }
}
