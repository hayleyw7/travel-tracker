// import chai from 'chai';
// const expect = chai.expect;

// import Traveler from '../src/Traveler.js';
// import travelersData from './test-data/travelersData.js';
// import tripsData from './test-data/tripsData';

// function instantiateTraveler() {
//   return `const traveler0 = new Traveler(travelersData.travelers[0]);`
// }

// describe('Traveler', () => {
//   let traveler0;

//   // NEED TO GET THIS WORKING
//   // beforeEach(function() {
//   //   traveler0 = new Traveler(travelersData[0]);
//   // });

//   // NEED TO REPLACE THIS WITH ABOVE BEFOREEACH
//   function instantiateTraveler() {
//     traveler0 = new Traveler(travelersData.travelers[0]);
//   }

//   it('is a function', function() {
//     expect(Traveler).to.be.a('function');
//   });

//   it('should be an instance of Traveler', function() {
//     instantiateTraveler()

//     expect(traveler0).to.be.an.instanceof(Traveler);
//   });

//     it('should get traveler name', function() {
//     instantiateTraveler()

//     expect(traveler0.getName()).to.equal('Ham')
//   });

//   it('should get traveler id', function() {
//     instantiateTraveler()

//     expect(traveler0.id).to.equal(1);
//   });

//   it('should get traveler type', function() {
//     instantiateTraveler()

//     expect(traveler0.travelerType).to.equal('relaxer');
//   });

//   it('should initialize with empty trips array', function() {
//     instantiateTraveler()

//     expect(traveler0.trips).to.deep.equal([]);
//   });

//     it('should initialize with empty currentTrip array', function() {
//     instantiateTraveler()

//     expect(traveler0.currentTrip).to.deep.equal([]);
//   });

//     it('should initialize with empty pendingTrips array', function() {
//     instantiateTraveler()

//     expect(traveler0.pendingTrips).to.deep.equal([]);
//   });

//     it('should initialize with pastTrips array', function() {
//     instantiateTraveler()

//     expect(traveler0.pastTrips).to.deep.equal([]);
//   });

//   it('should initialize with 0 spent this year', function() {
//     instantiateTraveler()

//     expect(traveler0.spentThisYear).to.equal(0);
//   });

//   it('should push to trips array', function() {
//     instantiateTraveler()

//     expect(traveler0.getTrips(trips, destinationsData).length).to.equal(1);
//   });
// });

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
