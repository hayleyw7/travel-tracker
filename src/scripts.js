import './css/base.scss';
// import './css/styles.scss';

// ***** QUERY SELECTORS *****

// NAVBAR

const navBarYourTripsBtn = document.querySelector('#yourTripsBtn');
const navBarTripPlannerBtn = document.querySelector('#tripPlannerBtn');

// LOGIN PAGE

const loginFormUsername = document.querySelector('#loginFormUsername');
const loginFormPassword = document.querySelector('#loginFormPassword');
const loginFormSubmitBtn = document.querySelector('#loginFormSubmitBtn');

// WANNA JET PAGE

const jetFormDate = document.querySelector('#jetFormDate');
const jetFormDuration = document.querySelector('#jetFormDuration');
const jetFormNumHumans = document.querySelector('#jetFormNumHumans');
const jetFormDestination = document.querySelector('#jetFormDestination');
const jetFormSubmitBtn = document.querySelector('#jetFormSubmitBtn');
const estimatedCostHTML = document.querySelector('#estimatedCostHTML');

// ***** EVENT LISTENERS *****

// NAVBAR

navBarYourTripsBtn.addEventListener('click', functionhere);
navBarTripPlannerBtn.addEventListener('click', functionhere);

// LOGIN PAGE

loginFormUsername.addEventListener('click', functionhere);
loginFormPassword.addEventListener('click', functionhere);
loginFormSubmitBtn.addEventListener('click', functionhere);

// WANNA JET PAGE
jetFormDate.addEventListener('click', functionhere);
jetFormDuration.addEventListener('click', functionhere);
jetFormNumHumans.addEventListener('click', functionhere);
jetFormDestination.addEventListener('click', functionhere);
jetFormSubmitBtn.addEventListener('click', functionhere);
estimatedCostHTML.addEventListener('click', functionhere);

// ***** FUNCTIONS *****

// SHOW & HIDE HELPER FUNCTIONS

function hide(elements) {
  elements.forEach(element => {
    element.classList.add('hidden');
  });
}

function show(elements) {
  elements.forEach(element => {
    element.classList.remove('hidden');
  });
}

// * HIDE & SHOW ELEMENTS *

function showHomePage() {
  hideGameFeatures();
  showHomeFeatures();
}

// game pages

function rpsGamePage() {
  game.playRps();
  hideHomeFeatures();
  showRpsGameFeatures();
  hide([rpsSelections, whoWon]);
  show([changeFormatBtn]);
}

function mtgGamePage() {
  game.playMtg();
  hideHomeFeatures();
  showMtgGameFeatures();
  hide([mtgSelections, whoWon]);
  show([changeFormatBtn]);
}

// selections pages

function rpsSelectionsPage() {
  hideRpsGameFeatures();
  hideHomeFeatures();
  show([rpsSelections, whoWon]);
  hide([changeFormatBtn]);
  setTimeout(function () { rpsGamePage(); }, 1200);
}

function mtgSelectionsPage() {
  hideMtgGameFeatures();
  hideHomeFeatures();
  show([mtgSelections, whoWon]);
  hide([changeFormatBtn]);
  setTimeout(function () { mtgGamePage(); }, 1200);
}

// LOCAL STORAGE MGMT

function startOverListener() {
  game.startOver();
}


///////////////


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
