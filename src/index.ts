import { TOrderPair } from '@waves/assets-pairs-order';

export { default as BigNumber } from './libs/bignumber';
export { IAssetJSON } from './entities/Asset';
export { IAssetPairJSON } from './entities/AssetPair/interface';
export { IMoneyJSON } from './entities/Money';
export { IOrderPriceJSON } from './entities/OrderPrice';

import { Asset } from './entities/Asset';
import { Money } from './entities/Money';
import { OrderPrice } from './entities/OrderPrice';
import createAssetPair from './entities/AssetPair/create';

const createDataEntities = (config: { orderPair: TOrderPair }) => ({
    Asset,
    Money,
    OrderPrice,
    AssetPair: createAssetPair(config.orderPair),
});

export default createDataEntities;
