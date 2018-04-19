import BigNumber from '../libs/bignumber';

import { IAssetJSON } from './interface';

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

    constructor(assetObject: IAssetJSON) {
        this.ticker = assetObject.ticker || null;
        this.id = assetObject.id;
        this.name = assetObject.name;
        this.precision = assetObject.precision;
        this.description = assetObject.description;
        this.height = assetObject.height;
        this.timestamp = assetObject.timestamp;
        this.sender = assetObject.sender;
        this.quantity = assetObject.quantity;
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
