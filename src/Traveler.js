class Traveler {

  constructor(data, trips, destinations) {
    this.id = data.id;
    this.name = data.name;
    this.trips = trips;
    this.destinations = destinations;
    this.travelerType = data.travelerType;
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

  getTotalSpent() {

    return this.trips.reduce((sum, trip) => {

      const destination = this.getDestination(trip);

      const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;

      const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;

      sum += flightCost + lodgingCost;

      return sum;
    }, 0);
  }

  getDestination(trip) {
    return this.destinations.find(destination => destination.id === trip.destinationID);
  }
}

export default Traveler