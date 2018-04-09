import { IAsset } from '..';
import BigNumber from '../libs/bignumber';


export interface IMoney {

    readonly asset: IAsset;

    getCoins(): BigNumber;

    getTokens(): BigNumber;

    toCoins(): string;

    toTokens(): string;

    toFormat(): string;

    add(money: IMoney): IMoney;

    plus(money: IMoney): IMoney;

    sub(money: IMoney): IMoney;

    minus(money: IMoney): IMoney;

    eq(money: IMoney): boolean;

    lt(money: IMoney): boolean;

    lte(money: IMoney): boolean;

    gt(money: IMoney): boolean;

    gte(money: IMoney): boolean;

    cloneWithCoins(coins: BigNumber | string): IMoney;

    cloneWithTokens(tokens: BigNumber | string): IMoney;

    convertTo(asset: IAsset, exchangeRate: BigNumber | string): IMoney;

    toJSON(): IMoneyJSON;

    toString(): string;
}

export interface IMoneyJSON {
    assetId: string;
    tokens: string;
}
