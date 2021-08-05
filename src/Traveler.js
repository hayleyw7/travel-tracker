// import Trip from '../src/Trip.js';

// class Traveler {
//   constructor(travelersData, destinationsData) {
//     this.id = travelersData.id,
//     this.name = travelersData.name,
//     this.travelerType = travelersData.travelerType,
//     this.trips = [],
//     this.currentTrip = [],
//     this.pendingTrips = [],
//     this.pastTrips = [],
//     this.spentThisYear = 0
//     this.destinationsData = destinationsData;
//   }

//   getName() {
//     return this.name.split(' ')[0];
//   }

//   getTrips(trips, destinationsData) {
//     let trip = new Trip(tripsData[0], destinationData[0]);
//     // let tripDestination

//     // const destinationsVar = destinationsData;

//     // const result = destinationsVar.find(destination => {
//       // let trip0 = new Trip(tripsData[0], destinationsData)

//       // if (trip0.destinationID = destination.id) {
//         // tripDestination = destination
//     //   }
//     // })
//     // if (trip0.userID === this.id) {
//       this.trips.push(trip)
//     // }

//     // return result;
//     }
  
  
//   getPastTrips() {

//     return this.pastTrips;
//   }

//   getCurrentTrip() {

//     return this.currentTrip;
//   }

//   getPendingTrips() {

//     return this.pendingTrips;
//   }

//   getSpentThisYear() {

//     return this.spentThisYear;
//   }
// }

// export default Traveler;

// This is the JavaScript entry file - your code begins here

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