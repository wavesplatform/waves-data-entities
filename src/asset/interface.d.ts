import BigNumber from '../libs/bignumber';

export type TPrecision = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface IAssetObject {
    readonly ticker?: string;
    readonly id: string;
    readonly name: string;
    readonly precision: TPrecision;
    readonly description: string;
    readonly height: number;
    readonly timestamp: Date;
    readonly sender: string;
    readonly quantity: BigNumber;
    readonly reissuable: boolean;
}
