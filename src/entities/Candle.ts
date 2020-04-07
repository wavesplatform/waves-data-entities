import { BigNumber } from '@waves/bignumber';
import { config } from '../config';
import { toBigNumber } from '../utils';

export interface ICandleInfo {
  readonly time: Date;
  readonly open: BigNumber | string | number;
  readonly close: BigNumber | string | number;
  readonly high: BigNumber | string | number;
  readonly low: BigNumber | string | number;
  readonly volume: BigNumber | string | number;
  readonly quoteVolume: BigNumber | string | number;
  readonly weightedAveragePrice: BigNumber | string | number;
  readonly maxHeight: number;
  readonly txsCount: number;
}

export interface ICandleJSON extends ICandleInfo {
  readonly open: BigNumber;
  readonly close: BigNumber;
  readonly high: BigNumber;
  readonly low: BigNumber;
  readonly volume: BigNumber;
  readonly quoteVolume: BigNumber;
  readonly weightedAveragePrice: BigNumber;
}

export class Candle {
  public readonly time: Date;
  public readonly open: BigNumber;
  public readonly close: BigNumber;
  public readonly high: BigNumber;
  public readonly low: BigNumber;
  public readonly volume: BigNumber;
  public readonly quoteVolume: BigNumber;
  public readonly weightedAveragePrice: BigNumber;
  public readonly maxHeight: number;
  public readonly txsCount: number;

  constructor(candleObject: ICandleInfo) {
    candleObject = config.get('remapCandle')(candleObject);

    const bigNumbers = [
      'open',
      'close',
      'high',
      'low',
      'volume',
      'quoteVolume',
      'weightedAveragePrice',
    ];

    bigNumbers.forEach(key => (this[key] = toBigNumber(candleObject[key])));

    this.time = candleObject.time;
    this.maxHeight = candleObject.maxHeight;
    this.txsCount = candleObject.txsCount;
  }

  public toJSON(): ICandleJSON {
    return {
      time: this.time,
      open: this.open,
      close: this.close,
      high: this.high,
      low: this.low,
      volume: this.volume,
      quoteVolume: this.quoteVolume,
      weightedAveragePrice: this.weightedAveragePrice,
      maxHeight: this.maxHeight,
      txsCount: this.txsCount,
    };
  }

  public toString(): string {
    return '[object Candle]';
  }

  public static isCandle(object: object): object is Candle {
    return object instanceof Candle;
  }
}
