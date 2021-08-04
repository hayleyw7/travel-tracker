import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/Trip.js';
import tripsData from './test-data/tripsData.js';
import destinationsData from './test-data/destinationsData.js';

describe('Trip', () => {
  // beforeEach(() => {
  // });

  it('is a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', function() {
    const trip = new Trip(tripsData.trips[0], destinationsData.destinations[0]);

    expect(trip).to.be.an.instanceof(Trip);
  });

});