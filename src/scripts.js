import './css/base.scss';

import {
  fetchData
  // postTravelerData,
  // postDestinationData,
  // postTripData
  // fetchTraveler
  // getTravelers
  
} from './apiCalls';

import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';

const {
  navBarLinksSection,
  navBarYourTripsBtn,
  navBarTripPlannerBtn,
  loginPage,
  loginFormUsername,
  loginFormPassword,
  loginFormSubmitBtn,
  yourTripsDashboardPage,
  wannaJetPage,
  jetFormDate,
  jetFormDuration,
  jetFormHumans,
  jetFormDestination,
  jetFormSubmitBtn,
  estimatedCostHTML,
  letsJetBtn,
  enterYourPassToPlan
} = domUpdates;

// ***** EVENT LISTENERS *****

window.addEventListener('load', returnData);

// NAVBAR
navBarYourTripsBtn.addEventListener('click', showYourTripsDashboardPage);
navBarTripPlannerBtn.addEventListener('click', showWannaJetPage);

// LOGIN PAGE
loginFormSubmitBtn.addEventListener('click', submitPassword);

// WANNA JET PAGE
jetFormSubmitBtn.addEventListener('click', showEstimatedCost);
letsJetBtn.addEventListener('click', createTrip);

// ***** API STUFF *****

function getData() {
  return Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')]);
}

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
  domUpdates.renderFirstName()
}

///


// function postTravelerInputs() {
//   postTravelerData(travelerID, travelerName, travelerType)
//     .then((response) => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       } else {
//         //?.innerText = "Success"
//         // domUpdates.renderSubmittedHydration(hydrationInput.value)
//       }
//     })
//     .catch(error => {
//       // ?.innerText = "Fail";
//       console.log(error)
//     })
// }

// function postTripInputs() {
//   postTripData(tripID, tripTravelerID, destinationID, numTravelers, tripDate, tripDuration, travelerStatus, tripStatus, suggestedActivities)
//     .then((response) => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       } else {
//         // ???
//       }
//     })
//     .catch(error => {
//         // ???
//       console.log(error)
//     })
// }

// function postDestinationInputs() {
//   postTravelerData(destinationID, destinationLocation, dailyLodgingCost, flightTicketCost, destinationImg)
//     .then((response) => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       } else {
//         // ???
//       }
//     })
//     .catch(error => {
//         // ???
//       console.log(error)
//     })
// }


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

// SHOW & HIDE PAGE FUNCTIONS

function showLoginPage() {
  hide([yourTripsDashboardPage, wannaJetPage, navBarLinksSection]);
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

// INSTANTIATE TRIP

function createTrip() {
  if (jetFormDate.value && jetFormDuration.value && jetFormHumans.value && jetFormDestinatio.value) {
    currentTrip = new Trip();
  }
}

// DOM UPDATES (will move to domUpdates after test working)

function showEstimatedCost() {
  event.preventDefault()
  // const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
  // const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;

  // const costToDisplay = flightCost + lodgingCost;
  // estimatedCostHTML.innerHTML = `${costToDisplay}`


  if (!jetFormDate.value || !jetFormDuration.value || !jetFormHumans.value || !jetFormDestination.value) {
    estimatedCostHTML.innerText = `Please tell us all of the things if you want us to make stuff happen and such!`;
  }  else {
    // alert('Please tell us all of the things!');
    estimatedCostHTML.innerText = `If you see this, THE BUG IS FIXED!`;
  }
}

function submitPassword() {
  event.preventDefault();
  if (!loginFormPassword.value || !loginFormUsername.value) { 
    enterYourPassToPlan.innerText = `Please fill in both fields.`
  } else {
    showYourTripsDashboardPage()
  }
}

// test

// function testAlert() {
//   alert("I am an alert box!");
// }

// help

// fetch the data. assign it to a variable. then filter the results based off your form values and present the options to the user (i.e. .map to return HTML cards)