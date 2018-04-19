import { IOrderPriceJSON } from './interface';
import { AssetPair } from '..';
import BigNumber from '../libs/bignumber';
export declare class OrderPrice {
    readonly pair: AssetPair;
    private _matcherCoins;
    private _tokens;
    private static _MATCHER_SCALE;
    constructor(coins: BigNumber, pair: AssetPair);
    getMatcherCoins(): BigNumber;
    getTokens(): BigNumber;
    toMatcherCoins(): string;
    toTokens(): string;
    toFormat(): string;
    toJSON(): IOrderPriceJSON;
    toString(): string;
    private static _getMatcherDivider(precision);
    static isOrderPrice(object: object): object is OrderPrice;
}
