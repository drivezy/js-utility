import 'babel-polyfill';
import chai from 'chai';
import path from 'path';
import assert from 'assert';
import should from 'should';

import { LogData } from './../src/test.utils';

chai.should();
import Test from './../src/index';

before(function (done) {
    // MockLogin(done);
    // describe('GetAllCitiesWithVenuesAndCars', () => {
    //     it('This should return cities with venues and cars', async () => {
    //         const result = await GetAllCitiesWithVenuesAndCars();
    //         // LogData(result);
    //     });
    // })
})

describe('Booking', function () {
    describe('fetchCarsInRange', () => {
        it('should return cars in range', async () => {
            const slot = {
                bike: 0,
                city: 2,
                end_time: "2018-07-09 23:00:00",
                latitude: 12.984971999999999,
                longitude: 77.644611,
                src: "22",
                start_time: "2018-07-09 11:00:00",
                type: 18
            };
            const result = await Booking.fetchCarsInRange(slot);
            LogData(result);
        });
    })

})