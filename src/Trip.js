import chai from 'chai';
import Traveler from '../src/Traveler.js';

const expect = chai.expect;

const travelers = require('../src/travelers');
const trips = require('../src/trips');


const data = travelers.find(traveler => traveler.id === 1)

const bob = new Traveler(data, trips);

class Trip {
  constructor(tripData) {
    this.tripData = tripData
    // maybe pass in destinations later?
    // this.destinations = destinations
  }

  // findTripByUser() {
    // might have to make this to access specific trip inside that big trip array
  // }
}

export default Trip;