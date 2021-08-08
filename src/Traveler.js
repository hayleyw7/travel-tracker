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

  getTripsByStatus(dateToday, status) {
    let today = this.trips.today;
    let current = this.trip.startDate <= today && this.trip.endDate >= today
    let future = trip.startDate > today
    let pending = this.trip.status === 'pending'
    let past =  this.trip.status === 'past'

    const result = this.trips.filter(trip => {
      if (current) {
        this.trips.status = current;
        return current;
      } else if (future) {
        return future;
      } else if (pending) {
        return pending;
      } else {
        return past;
      }
    })
  }


  getPastTrips() {
    return this.trips;
  }

  getTripsString() {
    const result = this.trips.reduce((tripString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID).destination

      tripString = tripString.concat(destination + '<br>');

      return tripString;

    }, '');
    return result;
  }

  getDestination(trip) {
    return this.destinations.find(destination => destination.id === trip.destinationID);
  }

  getTotalSpent() {

    return this.trips.reduce((sum, trip) => {

      const destination = this.getDestination(trip);

      const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;

      const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;

      const travelAgentFactor = 1.1;

      sum += travelAgentFactor * (flightCost + lodgingCost);

      return sum;
    }, 0);
  }
}

export default Traveler