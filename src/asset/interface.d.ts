export type TPrecision = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface IAssetObject {
    readonly id: string;
    readonly name: string;
    readonly precision: TPrecision;
    readonly description: string;
}

export interface IAsset {
    readonly id: string;
    readonly name: string;
    readonly precision: TPrecision;
    readonly description: string;

    toString(): string;

    toJSON(): IAssetObject;
}
