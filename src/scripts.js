
import './css/base.scss';
// import './css/styles.scss';

// ***** QUERY SELECTORS *****

// const test = document.querySelector('#test');
// const test2 = document.querySelector('#test2');


// NAVBAR

const name = document.querySelector('#name');

const navBarLinksSection = document.querySelector('#navBarLinksSection');

const navBarYourTripsBtn = document.querySelector('#navBarYourTripsBtn');
const navBarTripPlannerBtn = document.querySelector('#navBarTripPlannerBtn');

// LOGIN PAGE

const loginPage = document.querySelector('#loginPage');

const loginFormUsername = document.querySelector('#loginFormUsername');
const loginFormPassword = document.querySelector('#loginFormPassword');
const loginFormSubmitBtn = document.querySelector('#loginFormSubmitBtn');

// YOUR TRIPS DASHBOARD PAGE

const yourTripsDashboardPage = document.querySelector('#yourTripsDashboardPage');

// WANNA JET PAGE

const wannaJetPage = document.querySelector('#wannaJetPage');

const jetFormDate = document.querySelector('#jetFormDate');
const jetFormDuration = document.querySelector('#jetFormDuration');
const jetFormNumHumans = document.querySelector('#jetFormNumHumans');
const jetFormDestination = document.querySelector('#jetFormDestination');
const jetFormSubmitBtn = document.querySelector('#jetFormSubmitBtn');
const estimatedCostHTML = document.querySelector('#estimatedCostHTML');

// ***** EVENT LISTENERS *****

// NAVBAR

navBarYourTripsBtn.addEventListener('click', showYourTripsDashboardPage);
navBarTripPlannerBtn.addEventListener('click', showWannaJetPage);


function testAlert() {
  alert("I am an alert box!");
}
// // LOGIN PAGE

// loginFormUsername.addEventListener('click', functionhere);
// loginFormPassword.addEventListener('click', functionhere);
// loginFormSubmitBtn.addEventListener('click', functionhere);

// // WANNA JET PAGE
// jetFormDate.addEventListener('click', functionhere);
// jetFormDuration.addEventListener('click', functionhere);
// jetFormNumHumans.addEventListener('click', functionhere);
// jetFormDestination.addEventListener('click', functionhere);
// jetFormSubmitBtn.addEventListener('click', functionhere);
// estimatedCostHTML.addEventListener('click', functionhere);

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

// * PAGES *

function showLoginPage() {
  hide([yourTripsDashboardPage, wannaJetPage, navBarLinksSection, name]);
  show([loginPage]);
}

function showWannaJetPage() {
  hide([loginPage, yourTripsDashboardPage]);
  show([wannaJetPage, navBarLinksSection]);
}

function showYourTripsDashboardPage() {
  hide([loginPage, wannaJetPage]);
  show([navBarLinksSection, yourTripsDashboardPage]);
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
    .then(startApp);
}

// add parameters/arguments

function startApp() {
  // let traveler = new Traveler()
  // let trip = new Trip()
}

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
