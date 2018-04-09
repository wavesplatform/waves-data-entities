import { IMoney, IMoneyJSON } from './interface';
import { IAsset } from '..';
import BigNumber from '../libs/bignumber';


export class Money implements IMoney {

    public readonly asset: IAsset;

    private _coins: BigNumber;
    private _tokens: BigNumber;

    private constructor(coins: BigNumber, asset: IAsset) {
        const divider = Money._getDivider(asset.precision);
        this.asset = asset;
        this._coins = coins;
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

    public toFormat(): string {
        return this._tokens.toFormat(this.asset.precision);
    }

    public add(money: IMoney): IMoney {
        this._matchAssets(money);
        const inputCoins = money.getCoins();
        const result = this._coins.plus(inputCoins);
        return new Money(result, this.asset);
    }

    public plus(money: IMoney): IMoney {
        return this.add(money);
    }

    public sub(money: IMoney): IMoney {
        this._matchAssets(money);
        const inputCoins = money.getCoins();
        const result = this._coins.minus(inputCoins);
        return new Money(result, this.asset);
    }

    public minus(money: IMoney): IMoney {
        return this.sub(money);
    }

    public eq(money: IMoney): boolean {
        this._matchAssets(money);
        return this._coins.eq(money.getCoins());
    }

    public lt(money: IMoney): boolean {
        this._matchAssets(money);
        return this._coins.lt(money.getCoins());
    }

    public lte(money: IMoney): boolean {
        this._matchAssets(money);
        return this._coins.lte(money.getCoins());
    }

    public gt(money: IMoney): boolean {
        this._matchAssets(money);
        return this._coins.gt(money.getCoins());
    }

    public gte(money: IMoney): boolean {
        this._matchAssets(money);
        return this._coins.gte(money.getCoins());
    }

    public cloneWithCoins(coins: string | BigNumber): IMoney {
        Money._checkAmount(coins);
        return new Money(new BigNumber(coins), this.asset);
    }

    public cloneWithTokens(tokens: string | BigNumber): IMoney {
        Money._checkAmount(tokens);
        const coins = Money._tokensToCoins(tokens, this.asset.precision);
        return new Money(coins, this.asset);
    }

    public convertTo(asset: IAsset, exchangeRate: BigNumber): IMoney {
        return Money.convert(this, asset, exchangeRate);
    }

    public toJSON(): IMoneyJSON {
        return {
            assetId: this.asset.id,
            tokens: this.toTokens()
        };
    }

    public toString(): string {
        return `${this.toTokens()} ${this.asset.id}`;
    }

    private _matchAssets(money: IMoney): void {
        if (this.asset.id !== money.asset.id) {
            throw new Error('You cannot apply arithmetic operations to Money created with different assets');
        }
    }

    public static convert(money: IMoney, asset: IAsset, exchangeRate: BigNumber | string): IMoney {
        if (money.asset === asset) {
            return money;
        } else {
            const difference = money.asset.precision - asset.precision;
            const divider = new BigNumber(10).pow(difference);
            const coins = money.getCoins();
            const result = coins.multipliedBy(exchangeRate).div(divider).toFixed(0, BigNumber.ROUND_DOWN);
            return new Money(new BigNumber(result), asset);
        }
    }

    public static isMoney(object: object): object is IMoney {
        return object instanceof Money;
    }

    private static _checkAmount(amount: string | BigNumber): void {
        if (!(typeof amount === 'string' || amount instanceof BigNumber)) {
            throw new Error('Please use strings to create instances of Money');
        }
    }

    private static _tokensToCoins(tokens: string | BigNumber, precision: number): BigNumber {
        const divider = Money._getDivider(precision);
        tokens = new BigNumber(tokens).toFixed(precision);
        return new BigNumber(tokens).multipliedBy(divider);
    }

    private static _getDivider(precision: number): BigNumber {
        return new BigNumber(10).pow(precision);
    }
}
