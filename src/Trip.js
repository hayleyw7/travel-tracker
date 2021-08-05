import chai from 'chai';
import Traveler from '../src/Traveler.js';

const expect = chai.expect;

const travelers = require('../src/travelers');
const trips = require('../src/trips');

const data = travelers.find(traveler => traveler.id === 1)

const bob = new Traveler(data, trips);

class Trip {
  constructor(tripsData, destinationsData) {
    this.id = tripsData.id,
    this.userID = tripsData.userID,
    this.destinationID = tripsData.destinationID,
    this.travelers = tripsData.travelers,
    this.date = tripsData.date,
    this.duration = tripsData.duration,
    this.status = tripsData.status,
    this.destinationsData = destinationsData
  }
}

export default Trip;