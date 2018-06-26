import { Asset } from './Asset';
import { BigNumber } from '../libs/bignumber';
import { toBigNumber } from '../utils';


export interface IMoneyJSON {
    assetId: string;
    tokens: string;
}

export type TMoneyInput = string | number | BigNumber;

export class Money {
    public readonly asset: Asset;

    private _coins: BigNumber;
    private _tokens: BigNumber;

    // @todo refactor to accept full 'tokens' instead of 'coins'
    // to hide precision arithmetic implementation
    constructor(coins: TMoneyInput, asset: Asset) {
        const divider = Money._getDivider(asset.precision);
        this.asset = asset;
        this._coins = toBigNumber(coins).dp(0);
        this._tokens = this._coins.div(divider);
    }

    public getCoins(): BigNumber {
        return this._coins.plus(0);
    }

    public getTokens(): BigNumber {
        return this._tokens.plus(0);
    }

    public toCoins(): string {
        return this._coins.toFixed(0);
    }

    public toTokens(): string {
        return this._tokens.toFixed(this.asset.precision);
    }

    public toFormat(precision?: number): string {
        return this._tokens.toFormat(precision);
    }

    public add(money: Money): Money {
        this._matchAssets(money);
        const inputCoins = money.getCoins();
        const result = this._coins.plus(inputCoins);
        return new Money(result, this.asset);
    }

    public plus(money: Money): Money {
        return this.add(money);
    }

    public sub(money: Money): Money {
        this._matchAssets(money);
        const inputCoins = money.getCoins();
        const result = this._coins.minus(inputCoins);
        return new Money(result, this.asset);
    }

    public minus(money: Money): Money {
        return this.sub(money);
    }

    public times(money: Money): Money {
        this._matchAssets(money);
        return new Money(this.getTokens().times(money.getTokens()), this.asset);
    }

    public div(money: Money): Money {
        this._matchAssets(money);
        return new Money(this.getTokens().div(money.getTokens()), this.asset);
    }

    public eq(money: Money): boolean {
        this._matchAssets(money);
        return this._coins.eq(money.getCoins());
    }

    public lt(money: Money): boolean {
        this._matchAssets(money);
        return this._coins.lt(money.getCoins());
    }

    public lte(money: Money): boolean {
        this._matchAssets(money);
        return this._coins.lte(money.getCoins());
    }

    public gt(money: Money): boolean {
        this._matchAssets(money);
        return this._coins.gt(money.getCoins());
    }

    public gte(money: Money): boolean {
        this._matchAssets(money);
        return this._coins.gte(money.getCoins());
    }

    public safeSub(money: Money): Money {
        if (this.asset.id === money.asset.id) {
            return this.sub(money);
        }
        return this;
    }

    public toNonNegative(): Money {
        if (this.getTokens().lt(0)) {
            return this.cloneWithTokens(0);
        }
        return this;
    }

    // @todo coins refactor
    public cloneWithCoins(coins: TMoneyInput): Money {
        return new Money(new BigNumber(coins), this.asset);
    }

    public cloneWithTokens(tokens: TMoneyInput): Money {
        const coins = Money._tokensToCoins(tokens, this.asset.precision);
        return new Money(coins, this.asset);
    }

    public convertTo(asset: Asset, exchangeRate: TMoneyInput): Money {
        return Money.convert(this, asset, toBigNumber(exchangeRate));
    }

    public toJSON(): IMoneyJSON {
        return {
            assetId: this.asset.id,
            tokens: this.toTokens(),
        };
    }

    public toString(): string {
        return `${this.toTokens()} ${this.asset.id}`;
    }

    private _matchAssets(money: Money): void {
        if (this.asset.id !== money.asset.id) {
            throw new Error(
                'You cannot apply arithmetic operations to Money created with different assets'
            );
        }
    }

    public static max(...moneyList: Array<Money>): Money {
        return moneyList.reduce((max, money) => max.gte(money) ? max : money);
    }

    public static min(...moneyList: Array<Money>): Money {
        return moneyList.reduce((min, money) => min.lte(money) ? min : money);
    }

    public static isMoney(object: object): object is Money {
        return object instanceof Money;
    }

    public static convert(money: Money, asset: Asset, exchangeRate: BigNumber | string): Money {
        if (money.asset === asset) {
            return money;
        } else {
            const difference = money.asset.precision - asset.precision;
            const divider = new BigNumber(10).pow(difference);
            const coins = money.getCoins();
            const result = coins
                .multipliedBy(exchangeRate)
                .div(divider)
                .toFixed(0, BigNumber.ROUND_DOWN);
            return new Money(new BigNumber(result), asset);
        }
    }

    public static fromTokens(count: TMoneyInput, asset: Asset): Money {
        const tokens = toBigNumber(count);
        return new Money(tokens.times(new BigNumber(10).pow(asset.precision)), asset);
    }

    public static fromCoins(count: TMoneyInput, asset: Asset): Money {
        return new Money(count, asset);
    }

    private static _tokensToCoins(tokens: TMoneyInput, precision: number): BigNumber {
        const divider = Money._getDivider(precision);
        tokens = new BigNumber(tokens).toFixed(precision);
        return new BigNumber(tokens).multipliedBy(divider);
    }

    private static _getDivider(precision: number): BigNumber {
        return new BigNumber(10).pow(precision);
    }
}
