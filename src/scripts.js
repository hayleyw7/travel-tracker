  
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// import './css/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

//////////////

import {
  fetchData
  // postTravelerData,
  // postDestinationData,
  // postTripData
} from './apiCalls';

import Traveler from './Traveler';
import Trip from './Trip';
import domUpdates from './domUpdates';

// const {
//  html item names here (example below)
//   hydrationButton
// } = domUpdates;

window.addEventListener('load', returnData);

let travelers, trips, destinations

function getData() {
  return Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')]);
}

// idk what to put below

function returnData() {
  getData()
    .then(promiseArray => {
      travelers = promiseArray[0].travelers;
      trips = promiseArray[1].trips;
      destinations = promiseArray[2].destinations;
      // currentUserId = currentUser.id;
      // currentDate = "2020/01/22";
      // startDate = "2020/01/15";
    })
    // .then(startApp);
}

// add parameters/arguments

// function startApp() {
//   let traveler = new Traveler()
//   let trip = new Trip()
// }

///

// add name functions

//   addName(currentUser, userRepo);
// }

// function addName() {
//   displayFirstName(user);
// }

// function displayFirstName(user) {
//   domUpdates.renderFirstName(user);
// }

//

function postTravelerInputs() {
  postTravelerData(travelerID, travelerName, travelerType)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        // hydrationHeader.innerText = "Success"
        // domUpdates.renderSubmittedHydration(hydrationInput.value)
      }
    })
    .catch(error => {
      // hydrationHeader.innerText = "Fail";
      console.log(error)
    })
}

function postTripInputs() {
  postTripData(tripID, tripTravelerID, destinationID, numTravelers, tripDate, tripDuration, travelerStatus, tripStatus, suggestedActivities)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        // hydrationHeader.innerText = "Success"
        // domUpdates.renderSubmittedHydration(hydrationInput.value)
      }
    })
    .catch(error => {
      // hydrationHeader.innerText = "Fail";
      console.log(error)
    })
}

function postDestinationInputs() {
  postTravelerData(destinationID, destinationLocation, dailyLodgingCost, flightTicketCost, destinationImg)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        // hydrationHeader.innerText = "Success"
        // domUpdates.renderSubmittedHydration(hydrationInput.value)
      }
    })
    .catch(error => {
      // hydrationHeader.innerText = "Fail";
      console.log(error)
    })
}



// function displayHistoricalWeek(randomHistory) {
//   domUpdates.renderHistoricalWeek(randomHistory);
// }