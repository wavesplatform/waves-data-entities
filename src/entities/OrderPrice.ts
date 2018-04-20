import { IAssetPair } from './AssetPair/interface';
import { BigNumber } from '../libs/bignumber';

export interface IOrderPriceJSON {
    amountAssetId: string;
    priceAssetId: string;
    priceTokens: string;
}

export class OrderPrice {
    public readonly pair: IAssetPair;

    private _matcherCoins: BigNumber;
    private _tokens: BigNumber;

    private static _MATCHER_SCALE = new BigNumber(10).pow(8);

    // @todo refactor to accept Money instead of BigNumber
    constructor(coins: BigNumber, pair: IAssetPair) {
        const divider = OrderPrice._getMatcherDivider(pair.precisionDifference);
        this.pair = pair;
        this._matcherCoins = coins;
        this._tokens = this._matcherCoins.div(divider);
    }

    public getMatcherCoins(): BigNumber {
        return this._matcherCoins.plus(0);
    }

    public getTokens(): BigNumber {
        return this._tokens.plus(0);
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

    private static _getMatcherDivider(precision: number): BigNumber {
        return new BigNumber(10)
            .pow(precision)
            .multipliedBy(OrderPrice._MATCHER_SCALE);
    }

    public static isOrderPrice(object: object): object is OrderPrice {
        return object instanceof OrderPrice;
    }
}
