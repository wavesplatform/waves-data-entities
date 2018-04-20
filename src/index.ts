import { TOrderPair } from '@waves/assets-pairs-order';

import { BigNumber } from './libs/bignumber';
import { Asset } from './entities/Asset';
import { Money } from './entities/Money';
import { OrderPrice } from './entities/OrderPrice';
import createAssetPair from './entities/AssetPair/create';
import { IAssetPairConstructor } from './entities/AssetPair/interface';

const createDataEntities = (config: { orderPair: TOrderPair }) => ({
    Asset,
    Money,
    OrderPrice,
    BigNumber,
    AssetPair: createAssetPair(config.orderPair),
});

export { IAssetJSON } from './entities/Asset';
export {
    IAssetPairJSON,
    IAssetPair,
    IAssetPairConstructor,
} from './entities/AssetPair/interface';
export { IMoneyJSON } from './entities/Money';
export { IOrderPriceJSON } from './entities/OrderPrice';
export default createDataEntities;
