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

        it('should drop insignificant digits', () => {

            const money0 = new Money('1.123', fakeZERO);
            expect(money0.toTokens()).to.equal('1');
            expect(money0.toCoins()).to.equal('1');

            const money8 = new Money('1.123', fakeZERO);
            expect(money8.toTokens()).to.equal('1');
            expect(money8.toCoins()).to.equal('1');
            expect(money8.toFormat()).to.equal('1');

        });

        it('toFormat', () => {
            const money8 = new Money('123', fakeZERO);
            expect(money8.toFormat()).to.equal('123');
            expect(money8.toFormat(1)).to.equal('123.0');
        });

        it('safeSub', () => {
            const money0 = Money.fromTokens(10, fakeZERO);
            const money1 = Money.fromTokens(10, fakeZERO);
            const money2 = Money.fromTokens(10, fakeFOUR);

            expect(money0.safeSub(money2).toFormat()).to.equal('10');
            expect(money0.safeSub(money1).toFormat()).to.equal('0');
        });

        it('times', () => {
            const money0 = Money.fromTokens(2, fakeZERO);
            const money1 = Money.fromTokens(4, fakeZERO);
            const money2 = Money.fromTokens(5, fakeZERO);

            expect(money0.times(money2).toFormat()).to.equal('10');
            expect(money0.times(money1).toFormat()).to.equal('8');
        });

        it('div', () => {
            const money0 = Money.fromTokens(10, fakeZERO);
            const money1 = Money.fromTokens(5, fakeZERO);
            const money2 = Money.fromTokens(2, fakeZERO);

            expect(money0.div(money2).toFormat()).to.equal('5');
            expect(money0.div(money1).toFormat()).to.equal('2');
        });

        it('toNonNegative', () => {
            const money0 = Money.fromTokens(5, fakeZERO);
            const money1 = Money.fromTokens(10, fakeZERO);

            expect(money0.sub(money1).toNonNegative().toFormat()).to.equal('0');
            expect(money0.toNonNegative().toFormat()).to.equal('5');
        });

    });

    describe('arithmetic operations', () => {

        // TODO

    });

    describe('arithmetic comparisons', () => {

        // TODO

    });

});
