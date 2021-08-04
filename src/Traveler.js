import Trip from '../src/Trip.js';

class Traveler {
  constructor(travelersData) {
    this.id = travelersData.id,
    this.name = travelersData.name,
    this.travelerType = travelersData.travelerType,
    this.trips = [],
    this.currentTrip = [],
    this.pendingTrips = [],
    this.pastTrips = [],
    this.spentThisYear = 0
  }

  getName() {
    return this.name.split(' ')[0];
  }

  getTrips() {
    allTrips.forEach(trip => {
      if (trip.userID === this.id) {
        this.trips.push(new Trip(trip));
      }
    });
    this.trips.forEach(trip => trip.getTripDates());
    this.sortTripsByDate();

    return this.trips;
  }

  getPastTrips() {

    return this.pastTrips;
  }

  getCurrentTrip() {

    return this.currentTrip;
  }

  getPendingTrips() {

    return this.pendingTrips;
  }

  getSpentThisYear() {

    return this.spentThisYear;
  }

}

export default Traveler;