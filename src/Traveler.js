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

    let future = approved.filter(trip => {
      let startDate = new Date(trip.date);
      let endDate = new Date(trip.date);

      endDate.setDate(endDate.getDate() + trip.duration);

      let today = new Date();

      if (today < startDate) {
        return true;
      }

    });

      let present = approved.filter(trip => {

      let startDate = new Date(trip.date);

      let endDate = new Date(trip.date);

      endDate.setDate(endDate.getDate() + trip.duration);

      let today = new Date();

      if (today < endDate && today > startDate) {
        return true;
      }

    });

    let pastString = past.reduce((tripsString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);

      let destinationName = destination.destination;

      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(destinationName + `<br><br>Cost: ${money.format(cost)} <br><br>`);

      return tripsString;

    }, '');

    let approvedString = approved.reduce((tripsString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);
      let destinationName = destination.destination;
      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(destinationName + `<br><br>Cost: ${money.format(cost)} <br><br>`);

      return tripsString;

    }, '');

    let pendingString = pending.reduce((tripsString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);
      let destinationName = destination.destination;
      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(destinationName + `<br><br>Cost: ${money.format(cost)} <br><br>`);

      return tripsString;

    }, '');

    let presentString = present.reduce((tripsString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);

      let destinationName = destination.destination;

      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(destinationName + '<br><br>Cost: ' + money.format(cost) + '<br><br>');

      return tripsString;

    }, '');

    let futureString = future.reduce((tripsString, trip) => {

      // console.log(this.destinations);
      //
      // console.log('NEXT ELEMENT: ' + this.destinations.find(destination => destination.id === trip.destinationID).destination + '<br><br>');

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);

      let destinationName = destination.destination;

      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(destinationName + '<br><br>Cost: ' + money.format(cost) + '<br><br>');

      return tripsString;

    }, '');

    let result = `
      <h3>Enjoy your stay!</h3>
      ${presentString}
      <h3>Pending Trips</h3>
      ${pendingString}
      <h3>Future Trips</h3>
      ${futureString}
      <h3>Past Trips</h3>
      ${pastString}
    `
    return result;
  }

  totalCostString() {
    var money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    
    let totalCostString = money.format(this.getTotalSpent());
    yearCost.innerHTML = `You've spent ${totalCostString} on trips this year.`
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