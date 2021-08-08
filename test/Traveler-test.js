import chai from 'chai';
import Traveler from '../src/Traveler.js';

const expect = chai.expect;

const travelers = require('../src/travelers.js');

const data = travelers.find(traveler => traveler.id === 1)

const trips = require('../src/trips.js').filter(trip => trip.userID === data.id);

const destinations = require('../src/destinations.js').filter(destination => {
  return trips.some(trip => trip.destinationID === destination.id)
});

const bob = new Traveler(data, trips, destinations);

describe('An individual Traveler', function() {

  it('should have a name', function() {

    expect(bob.getName()).to.equal("Ham Leadbeater");

  });

  it('should have an ID number', function() {

    expect(bob.getID()).to.equal(1);

  });

  it('should have a traveler type', function() {

    expect(bob.getTravelerType()).to.equal("relaxer");

  });

  it('should be able to return trip data', function() {

    expect(bob.getTrips()[0].date).to.equal("2021/01/09");

  });

  it('should be able to calculate the cost of all trips', function() {

    expect(bob.getTotalSpent()).to.equal(4125);

  });


});