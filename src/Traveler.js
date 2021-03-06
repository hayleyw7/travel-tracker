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

      let current = approved.filter(trip => {

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

      tripsString = tripsString.concat(`
          <article class='card'>
            <article class='photo-container'>
              <img src='${destination.image}' alt='${destination.destination} photo' class='destination-photo'>
            </article>
            <article class='destination-info-container'>
              <h3 class='destination-name'>${destination.destination}</h3>
              <p class='date-time'>${trip.date}</p>
            </article>
          </article>
      `);

      return tripsString;

    }, '');

    let pendingString = pending.reduce((tripsString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);
      let destinationName = destination.destination;
      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(`
          <article class='card'>
            <article class='photo-container'>
              <img src='${destination.image}' alt='${destination.destination} photo' class='destination-photo'>
            </article>
            <article class='destination-info-container'>
              <h3 class='destination-name'>${destination.destination}</h3>
              <p class='date-time'>${trip.date}</p>
            </article>
          </article>
      `);

      return tripsString;

    }, '');

    let currentString = current.reduce((tripsString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);

      let destinationName = destination.destination;

      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(`
          <article class='card'>
            <article class='photo-container'>
              <img src='${destination.image}' alt='${destination.destination} photo' class='destination-photo'>
            </article>
            <article class='destination-info-container'>
              <h3 class='destination-name'>${destination.destination}</h3>
              <p class='date-time'>${trip.date}</p>
            </article>
          </article>
      `);

      return tripsString;

    }, '');

    let futureString = future.reduce((tripsString, trip) => {

      let destination = this.destinations.find(destination => destination.id === trip.destinationID);

      let destinationName = destination.destination;

      let cost = this.getTotal(trip, destination);

      tripsString = tripsString.concat(`
          <article class='card'>
            <article class='photo-container'>
              <img src='${destination.image}' alt='${destination.destination} photo' class='destination-photo'>
            </article>
            <article class='destination-info-container'>
              <h3 class='destination-name'>${destination.destination}</h3>
              <p class='date-time'>${trip.date}</p>
            </article>
          </article>
      `);

      return tripsString;

    }, '');

    let result = [currentString, pendingString, futureString, pastString]

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
      if (trip.status === 'approved' && trip.date.split('/')[0] === '2021') {
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
    let length = this.trips.length;
    this.trips.push(trip);
    if (this.trips.length > length) {
      return true;
    } else {
      return false;
    }
  }

  addDestination(destination) {
    if (!this.destinations.includes(destination)) {
      let length = this.destinations.length;
      this.destinations.push(destination);
      if (this.destinations.length > length) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}

export default Traveler
