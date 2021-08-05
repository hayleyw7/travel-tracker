class Traveler {

  constructor(data, trips) {

    this.name = data.name;
    this.id = data.id;
    this.travelerType = data.travelerType;
    this.trips = trips.filter(trip => trip.userID === this.id);

  }

  getName() {
    return this.name;
  }

  getID() {
    return this.id;
  }

  getTravelerType() {
    return this.travelerType;
  }

  getTrips() {
    return this.trips;
  }

}

export default Traveler