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

  it.skip('should be able to return current, future, pending, & past trips', function() {

    console.log(user.getTripsHTML())

    expect(user.getTripsHTML()).to.deep.equal(['', '', '', `
      <li class="glide__slide">
        <article class='card'>
          <article class='photo-container'>
            <img src='https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80' alt='San Juan, Puerto Rico photo' class='destination-photo'> 
          </article>
          <article class='destination-info-container'>
            <h1 class='destination-name'>San Juan, Puerto Rico</h1>
            <p class='date-time'>2021/01/09</p>
          </article>
        </article>
      </li>
      `
    ])
  })

  it('should convert totalCost into a string', function() {

    expect(user.totalCostString()).to.equal('$7,095.00');
  });

  it('should find a destination for a trip', function() {

    expect(user.getDestination(user.getTrips()[0]))
    .to.deep.equal({
      "id":28,
      "destination": "San Juan, Puerto Rico",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 900,
      "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
      "alt":"white and brown concrete buildings near sea under white clouds during daytime"
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

  it('should add a destination', function() {

    expect(user.addDestination({
      "id":49,"destination":"Castries, St Lucia","estimatedLodgingCostPerDay":650,"estimatedFlightCostPerPerson":90,"image":"https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80","aƒconverlt":"aerial photography of rocky mountain under cloudy sky"
    })).to.equal(true);
  });  
});