import chai from 'chai';
import Traveler from '../src/Traveler.js';
import Trip from '../src/Trip.js';

const expect = chai.expect;

const travelers = require('../src/travelers.js');
const allTrips = require('../src/trips.js');
const allDestinations = require('../src/destinations.js');

const data = travelers.find(traveler => traveler.id === 1)
const trips = require('../src/trips.js').filter(trip => trip.userID === data.id);

const destinations = require('../src/destinations.js').filter(destination => {
  return trips.some(trip => trip.destinationID === destination.id)
});

const user = new Traveler(data, trips, destinations);
let trip = new Trip(trips)

describe('An individual Traveler', function() {

  it('should have a name', function() {

    expect(user.getName()).to.equal("Ham Leadbeater");
  });

  it('should have an ID number', function() {

    expect(user.getID()).to.equal(1);
  });

  it('should have a traveler type', function() {

    expect(user.getTravelerType()).to.equal("relaxer");
  });

  it('should be able to return trip data', function() {

    expect(user.getTrips()[0].date).to.equal("2021/01/09");
  });

  it('should be able to calculate the cost of all approved trips', function() {

    expect(user.getTotalSpent()).to.equal(7095.000000000001);
  });


  // this one is keeping the file from pushing to GH

  it('should be able to return current, future, pending, & past trips', function() {

    expect(user.getTripsHTML()).to.equal(`\n      <h3>We hope that you\'re enjoying your vibe!</h3>\n      \n      <h3>Pending Vibes</h3>\n      \n      <h3>Future Vibes</h3>\n      \n      <h3>Past Vibes</h3>\n      San Juan, Puerto Rico<br><br>Cost: $7,095.00 <br><br>\n    `);
  });

  it('should convert totalCost into a string', function() {

    expect(user.totalCostString()).to.equal('$7,095.00');
  });

  it.skip('should find a destination for a trip', function() {

    expect(user.getDestination({
      "id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]
    }))
    
    .to.equal({
      "id":49,"destination":"Castries, St Lucia","estimatedLodgingCostPerDay":650,"estimatedFlightCostPerPerson":90,"image":"https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80","alt":"aerial photography of rocky mountain under cloudy sky"
    });
  });

  it('should get the total of a trip', function() {

    expect(user.getTotal({
      "id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]
    }, {
      "id":49,"destination":"Castries, St Lucia","estimatedLodgingCostPerDay":650,"estimatedFlightCostPerPerson":90,"image":"https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80","aƒconverlt":"aerial photography of rocky mountain under cloudy sky"
    })).to.equal(5918.000000000001);
  });

  it('should add a trip', function() {

    expect(user.addTrip({
      "id":50,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]
    })).to.equal(true);
  });

  it.skip('should add a destination', function() {

    expect(user.addDestination({
      "id":49,"destination":"Castries, St Lucia","estimatedLodgingCostPerDay":650,"estimatedFlightCostPerPerson":90,"image":"https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80","aƒconverlt":"aerial photography of rocky mountain under cloudy sky"
    })).to.equal('x');
  });  
});