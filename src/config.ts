import { IAssetInfo } from './entities/Asset';
import { ICandleInfo } from './entities/Candle';


const storage: IConfig = {
    remapAsset: (data: IAssetInfo) => data,
    remapCandle: (data: ICandleInfo) => data
};

export namespace config {

    export function get<K extends keyof IConfig>(key: K): IConfig[K] {
        return storage[key];
    }

    export function set<K extends keyof IConfig>(key: K, value?: IConfig[K]): void;
    export function set(key: Partial<IConfig>): void;

    export function set<K extends keyof IConfig>(key: K | Partial<IConfig>, value?: IConfig[K]): void {
        if (typeof key === 'string') {
            storage[key] = value;
        } else {
            Object.keys(key).forEach((configKey: K) => set(configKey, key[configKey]));
        }
    }

}

export interface IConfig {
    remapAsset: (asset: IAssetInfo) => IAssetInfo;
    remapCandle: (candle: ICandleInfo) => ICandleInfo;
}
