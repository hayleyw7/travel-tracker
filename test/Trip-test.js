import chai from 'chai';
import Traveler from '../src/Traveler.js';
import Trip from '../src/Trip.js';

const expect = chai.expect;

const travelers = require('../src/travelers');
const trips = require('../src/trips');
const destinations = require('../src/trips');

const data = travelers.find(traveler => traveler.id === 1)

const bob = new Traveler(data, trips);





describe('Trip', () => {
  it('is a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', function() {
    let trip = new Trip(trips);

    expect(trip).to.be.an.instanceof(Trip);
  });

});