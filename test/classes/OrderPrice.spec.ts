import { expect } from 'chai';
import { getAssetData } from '../assetData';
import { BigNumber } from '@waves/bignumber';
import { Asset, AssetPair, OrderPrice } from '../../dist';


let fakeEIGHT;
let fakeFOUR;
let fakeZERO;
let pairOne;
let pairTwo;


// TODO : add test for `.toFormat()` method

describe('OrderPrice', () => {

    beforeEach(() => {

        fakeEIGHT = new Asset(getAssetData({
            id: 'EIGHT',
            name: 'Eight Precision Token',
            precision: 8
        }));

        fakeFOUR = new Asset(getAssetData({
            id: 'FOUR',
            name: 'Four Precision Token',
            precision: 4
        }));

        fakeZERO = new Asset(getAssetData({
            id: 'ZERO',
            name: 'Zero Precision Token',
            precision: 0
        }));

        pairOne = new AssetPair(fakeEIGHT, fakeZERO);
        pairTwo = new AssetPair(fakeZERO, fakeFOUR);

    });

    describe('creating instances', () => {

        it('should be an instance of OrderPrice', () => {
            const orderPrice = new OrderPrice(new BigNumber(10), pairOne);
            expect(OrderPrice.isOrderPrice(orderPrice)).to.be.true;
        });

    });

    describe('core functionality', () => {

        describe('tokens to matcher coins', () => {

            // TODO

            // it('should convert when assets precisions are the same [8, 8]', (done) => {
            //     OrderPrice.fromTokens('1.47', fakeWAVES, fakeBTC).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('147000000');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are the same [2, 2]', (done) => {
            //     OrderPrice.fromTokens('0.01', fakeUSD, fakeEUR).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('1000000');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are the same [0, 0]', (done) => {
            //     OrderPrice.fromTokens('5', fakeZERO, fakeZERO).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('500000000');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [8, 2]', (done) => {
            //     OrderPrice.fromTokens('11.5', fakeWAVES, fakeUSD).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('1150');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [8, 0]', (done) => {
            //     OrderPrice.fromTokens('555', fakeBTC, fakeZERO).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('555');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [2, 8]', (done) => {
            //     OrderPrice.fromTokens('2.33445566', fakeEUR, fakeBTC).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('233445566000000');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [0, 8]', (done) => {
            //     OrderPrice.fromTokens('100.01020304', fakeZERO, fakeWAVES).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('1000102030400000000');
            //     }).then(() => done());
            // });

        });

        describe('tokens to matcher coins while dropping insignificant digits', () => {

            // TODO

            // it('should convert when assets precisions are the same [8, 8]', (done) => {
            //     OrderPrice.fromTokens('11.509910102', fakeWAVES, fakeBTC).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('1150991010');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [8, 2]', (done) => {
            //     OrderPrice.fromTokens('11.5099', fakeWAVES, fakeUSD).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('1150');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [8, 0]', (done) => {
            //     OrderPrice.fromTokens('555.33', fakeBTC, fakeZERO).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('555');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [2, 8]', (done) => {
            //     OrderPrice.fromTokens('2.334455667788', fakeEUR, fakeBTC).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('233445566000000');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are the same [0, 0]', (done) => {
            //     OrderPrice.fromTokens('555.33', fakeZERO, fakeZERO).then((orderPrice) => {
            //         expect(orderPrice.toMatcherCoins()).to.equal('55500000000');
            //     }).then(() => done());
            // });

        });

        describe('matcher coins to tokens', () => {

            // TODO

            // it('should convert when assets precisions are the same [8, 8]', (done) => {
            //     OrderPrice.fromMatcherCoins('147000000', fakeWAVES, fakeBTC).then((orderPrice) => {
            //         expect(orderPrice.toTokens()).to.equal('1.47000000');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are the same [2, 2]', (done) => {
            //     OrderPrice.fromMatcherCoins('1000000', fakeUSD, fakeEUR).then((orderPrice) => {
            //         expect(orderPrice.toTokens()).to.equal('0.01');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are the same [0, 0]', (done) => {
            //     OrderPrice.fromMatcherCoins('500000000', fakeZERO, fakeZERO).then((orderPrice) => {
            //         expect(orderPrice.toTokens()).to.equal('5');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [8, 2]', (done) => {
            //     OrderPrice.fromMatcherCoins('1150', fakeBTC, fakeEUR).then((orderPrice) => {
            //         expect(orderPrice.toTokens()).to.equal('11.50');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [8, 0]', (done) => {
            //     OrderPrice.fromMatcherCoins('555', fakeWAVES, fakeZERO).then((orderPrice) => {
            //         expect(orderPrice.toTokens()).to.equal('555');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [2, 8]', (done) => {
            //     OrderPrice.fromMatcherCoins('233445566000000', fakeUSD, fakeWAVES).then((orderPrice) => {
            //         expect(orderPrice.toTokens()).to.equal('2.33445566');
            //     }).then(() => done());
            // });
            //
            // it('should convert when assets precisions are different [0, 8]', (done) => {
            //     OrderPrice.fromMatcherCoins('1000102030400000000', fakeZERO, fakeBTC).then((orderPrice) => {
            //         expect(orderPrice.toTokens()).to.equal('100.01020304');
            //     }).then(() => done());
            // });

        });

    });

    describe('conversions', () => {

        // TODO : JSON

        // TODO : string

    });

});
