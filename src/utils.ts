import { BigNumber } from '@waves/bignumber';


export function toBigNumber(some: string | number | BigNumber): BigNumber {
    return some instanceof BigNumber ? some : new BigNumber(some);
}
