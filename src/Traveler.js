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
      <h3>We hope that you're enjoying your vibe!</h3>
      ${presentString}
      <h3>Pending Vibes</h3>
      ${pendingString}
      <h3>Future Vibes</h3>
      ${futureString}
      <h3>Past Vibes</h3>
      ${pastString}
    `
    return result;
  }

  totalCostString() {
    var money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    
    return money.format(this.getTotalSpent());
  }

  getDestination(trip) {
    return this.destinations.find(destination => destination.id === trip.destinationID);
  }

  getTotalSpent() {
    return this.trips.reduce((sum, trip) => {
      if (trip.status === 'approved') {
        const destination = this.getDestination(trip);
        sum += this.getTotal(trip, destination);
      }
      return sum;
    }, 0);
  }

  getTotal(trip, destination) {
    const flightCost = (trip.travelers * destination.estimatedFlightCostPerPerson) * 2
    const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;
    const costWithoutAgent = flightCost + lodgingCost;
    const travelAgentFactor = 1.1;
    return costWithoutAgent * travelAgentFactor;
  }

  addTrip(trip) {
    this.trips.push(trip);
  }

  addDestination(destination) {
    if (!this.destinations.includes(destination)) {
      this.destinations.push(destination);
    }
  }
}

export default Traveler