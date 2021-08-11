import chai from 'chai';
import Traveler from '../src/Traveler.js';
import Trip from '../src/Trip.js';

const expect = chai.expect;

const travelers = require('../src/travelers');
const trips = require('../src/trips');
const destinations = require('../src/trips');

const data = travelers.find(traveler => traveler.id === 1)

const user = new Traveler(data, trips);
let trip = new Trip({"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]});

describe('Trip', () => {
  it('is a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', function() {

    expect(trip).to.be.an.instanceof(Trip);
  });

   it('should provide trip id', function() {

    expect(trip.id).to.equal(1);
  }); 

   it('should provide trip userID', function() {

    expect(trip.userID).to.equal(44);
  });   

   it('should provide trip destinationID', function() {

     console.log(trip.destinationID)

    expect(trip.destinationID).to.equal(49);
  });

   it('should provide trip status', function() {

    expect(trip.status).to.equal('approved');
  });   

   it('should provide trip suggested activities', function() {

    expect(trip.suggestedActivities).to.deep.equal([]);
  });       

  it.skip('should get user trip dates', function() {

    expect(trip.getUserTripDates()).to.equal('x');
  });});