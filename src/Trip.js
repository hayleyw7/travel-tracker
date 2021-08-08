import chai from 'chai';
import Traveler from '../src/Traveler.js';

const expect = chai.expect;

const travelers = require('../src/travelers');
const trips = require('../src/trips');


const data = travelers.find(traveler => traveler.id === 1)

const bob = new Traveler(data, trips);

class Trip {
  constructor(tripData) {
    this.tripData = tripData,
    this.startDate;
    this.endDate;
    this.estimatedCost;
    this.today = new Date();
    // maybe pass in destinations later?
    // this.destinations = destinations
  }

  getUserTripDates() {
    let tripDuration = this.tripData.duration;
    this.startDate = new Date(this.tripData.date);
    this.endDate = [startDate].setDate([startDate].getDate() + tripDuration);
  }
}

export default Trip;