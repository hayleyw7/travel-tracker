import chai from 'chai';
import Traveler from '../src/Traveler.js';

const expect = chai.expect;

const travelers = require('../src/travelers');
const trips = require('../src/trips');

const data = travelers.find(traveler => traveler.id === 1)

class Trip {
  constructor(tripData) {
    this.tripData = tripData;
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinatonID;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;

    this.startDate;
    this.endDate;
    this.estimatedCost;
    this.today = new Date();
  }
  
  getUserTripDates() {
    let tripDuration = this.tripData.duration;
    this.startDate = new Date(this.tripData.date);
    this.endDate = startDate.setDate(startDate.getDate() + tripDuration);
  }
}

export default Trip;