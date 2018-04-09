import { IAssetPair } from '..';
import BigNumber from '../libs/bignumber';


export interface IOrderPrice {
    readonly pair: IAssetPair;

    getMatcherCoins(): BigNumber;

    getTokens(): BigNumber;

    toMatcherCoins(): string;

    toTokens(): string;

    toFormat(): string;

    toJSON(): IOrderPriceJSON;

    toString(): string;
}

export interface IOrderPriceJSON {
    amountAssetId: string;
    priceAssetId: string;
    priceTokens: string;
}
