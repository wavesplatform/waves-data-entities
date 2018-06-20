import { expect } from 'chai';
import { getAssetData } from '../assetData';
import { Asset, Money } from '../../dist';


let fakeEIGHT;
let fakeFOUR;
let fakeZERO;


// TODO : add test for `.toFormat()` method

describe('Money', () => {

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

    });

    describe('creating instances', () => {

        it('should be an instance of Money', () => {
            const money = new Money(10, fakeEIGHT);
            expect(Money.isMoney(money)).to.be.true;
            expect(Asset.isAsset(money.asset)).to.be.true;
        });

    });

    describe('core functionality', () => {

        it('should convert Money to tokens and to coins', () => {

            const money8 = new Money(100000000, fakeEIGHT);
            expect(money8.toTokens()).to.equal('1.00000000');
            expect(money8.toCoins()).to.equal('100000000');

            const money4 = new Money(10000, fakeFOUR);
            expect(money4.toTokens()).to.equal('1.0000');
            expect(money4.toCoins()).to.equal('10000');

        });

        it('should throw exception with insignificant digits', () => {
            expect(() => new Money('1.123', fakeZERO)).to.throw('Coins must be integer!');
        });

        it('should drop insignificant digits', () => {
            const money8 = new Money(120000000, fakeEIGHT);
            expect(money8.toFormat()).to.equal('1.2');
        });

    });

    describe('arithmetic operations', () => {

        // TODO

    });

    describe('arithmetic comparisons', () => {

        // TODO

    });

});
