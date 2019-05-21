import { BigNumber } from '@waves/bignumber';
import { AssetPair } from './AssetPair';
import { toBigNumber } from '../utils';

export interface IOrderPriceJSON {
    amountAssetId: string;
    priceAssetId: string;
    priceTokens: string;
}

export class OrderPrice {
    public readonly pair: AssetPair;

    private _matcherCoins: BigNumber;
    private _tokens: BigNumber;

    private static _MATCHER_SCALE = new BigNumber(10).pow(8);

    // @todo refactor to accept Money instead of BigNumber
    constructor(coins: BigNumber, pair: AssetPair) {
        const divider = OrderPrice._getMatcherDivider(pair.precisionDifference);
        this.pair = pair;
        this._matcherCoins = coins;
        this._tokens = this._matcherCoins.div(divider);
    }

    public getMatcherCoins(): BigNumber {
        return this._matcherCoins.clone();
    }

    public getTokens(): BigNumber {
        return this._tokens.clone();
    }

    public toMatcherCoins(): string {
        return this._matcherCoins.toFixed(0);
    }

    public toTokens(): string {
        return this._tokens.toFixed(this.pair.priceAsset.precision);
    }

    public toFormat(): string {
        return this._tokens.toFormat(this.pair.priceAsset.precision);
    }

    public toJSON(): IOrderPriceJSON {
        return {
            amountAssetId: this.pair.amountAsset.id,
            priceAssetId: this.pair.priceAsset.id,
            priceTokens: this.toTokens(),
        };
    }

    public toString(): string {
        return `${this.toTokens()} ${this.pair.amountAsset.id}/${
            this.pair.priceAsset.id
            }`;
    }

    public static fromMatcherCoins(coins: string | number | BigNumber, pair: AssetPair): OrderPrice {
        OrderPrice._checkAmount(coins);
        return new OrderPrice(toBigNumber(coins), pair);
    }

    public static fromTokens(tokens: string | number | BigNumber, pair: AssetPair): OrderPrice {
        OrderPrice._checkAmount(tokens);
        tokens = toBigNumber(tokens).toFixed(pair.priceAsset.precision);
        const divider = OrderPrice._getMatcherDivider(pair.precisionDifference);
        const coins = new BigNumber(tokens).mul(divider);
        return new OrderPrice(coins, pair);
    }

    private static _getMatcherDivider(precision: number): BigNumber {
        return new BigNumber(10)
            .pow(precision)
            .mul(OrderPrice._MATCHER_SCALE);
    }

    public static isOrderPrice(object: object): object is OrderPrice {
        return object instanceof OrderPrice;
    }

    private static _checkAmount(amount) {
        if (!(['string', 'number'].includes(typeof amount) || amount instanceof BigNumber)) {
            throw new Error('Please use strings to create instances of OrderPrice');
        }
    }
}
