import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/Traveler.js';
import travelersData from './test-data/travelersData.js';
import tripsData from './test-data/tripsData';

function instantiateTraveler() {
  return `const traveler0 = new Traveler(travelersData.travelers[0]);`
}

describe('Traveler', () => {
  let traveler0;

  // NEED TO GET THIS WORKING
  // beforeEach(function() {
  //   traveler0 = new Traveler(travelersData[0]);
  // });

  // NEED TO REPLACE THIS WITH ABOVE BEFOREEACH
  function instantiateTraveler() {
    traveler0 = new Traveler(travelersData.travelers[0]);
  }

  it('is a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', function() {
    instantiateTraveler()

    expect(traveler0).to.be.an.instanceof(Traveler);
  });

    it('should get traveler name', function() {
    instantiateTraveler()

    expect(traveler0.getName()).to.equal('Ham')
  });

  it('should get traveler id', function() {
    instantiateTraveler()

    expect(traveler0.id).to.equal(1);
  });

  it('should initialize with a type', function() {
    instantiateTraveler()

    expect(traveler0.travelerType).to.equal('relaxer');
  });

});