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

  getTripsHTML() {

    var money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    let approved = this.trips.filter(trip => trip.status === 'approved');
    let pending = this.trips.filter(trip => trip.status === 'pending');

    let past = approved.filter(trip => {
      let startDate = new Date(trip.date);
      let endDate = new Date(trip.date);

      endDate.setDate(endDate.getDate() + trip.duration);

      let today = new Date();

      if (today > endDate) {
        return true;
      }
      return false;
    });

    let approvedString = approved.reduce((tripsString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);
      let destinationName = destination.destination;
      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(destinationName + `<br><br>Cost: ${money.format(cost)} <br><br>`);

      return tripsString;

    }, "");

    let pendingString = pending.reduce((tripsString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);
      let destinationName = destination.destination;
      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(destinationName + `<br><br>Cost: ${money.format(cost)} <br><br>`);

      return tripsString;

    }, "");

    let totalCostString = money.format(this.getTotalSpent());

    let result =
      "<h4>Approved:</h4>"
      + approvedString
      + "<h4>Pending:</h4>"
      + pendingString
      + "<h5>Total Cost:</h5>"
      + totalCostString;

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

  getTotal(trip, destination) {
    const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
    const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;
    const travelAgentFactor = 1.1;
    return travelAgentFactor * (flightCost + lodgingCost);
  }
}

export default Traveler