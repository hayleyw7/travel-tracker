// import Trip from '../src/Trip.js';

class Traveler {
  constructor(travelersData) {
    this.id = travelersData.id,
    this.name = travelersData.name,
    this.travelerType = travelersData.travelerType,
    this.currentTrip = [],
    this.pendingTrips = [],
    this.pastTrips = [],
    this.spentThisYear = 0
  }

  getName() {
    return this.name[0];
  }
}

export default Traveler;