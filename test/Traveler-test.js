import chai from 'chai';
import Traveler from '../src/Traveler.js';

const expect = chai.expect;

const travelers = require('../src/travelers');
const trips = require('../src/trips');

const data = travelers.find(traveler => traveler.id === 1)

const bob = new Traveler(data, trips);

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


});
