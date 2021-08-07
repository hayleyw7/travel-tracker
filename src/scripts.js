
import './css/base.scss';
// import './css/styles.scss';

// ***** QUERY SELECTORS *****

// move all query selectors to domUpdates and then use this in scripts:
  // const {
  //  name
  //  navBarLinksSection
  //  navBarYourTripsBtn
  //  [etc for all]
  // } = domUpdates;


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
const letsJetBtn = document.querySelector('#letsJetBtn');


// ***** EVENT LISTENERS *****

// NAVBAR

navBarYourTripsBtn.addEventListener('click', showYourTripsDashboardPage);
navBarTripPlannerBtn.addEventListener('click', showWannaJetPage);

// // LOGIN PAGE

// loginFormUsername.addEventListener('click', functionhere);
// loginFormPassword.addEventListener('click', functionhere);
// loginFormSubmitBtn.addEventListener('click', functionhere);

// // WANNA JET PAGE
// jetFormDate.addEventListener('click', functionhere);
// jetFormDuration.addEventListener('click', functionhere);
// jetFormNumHumans.addEventListener('click', functionhere);
// jetFormDestination.addEventListener('click', functionhere);
jetFormSubmitBtn.addEventListener('click', showEstimatedCost);

// estimatedCostHTML.addEventListener('click', functionhere);
letsJetBtn.addEventListener('click', createTrip);


// ***** API STUFF *****

import {
  fetchData
  // postTravelerData,
  // postDestinationData,
  // postTripData
  // fetchTraveler
  // getTravelers
  
} from './apiCalls';

import Traveler from './Traveler';
import Trip from './Trip';
import domUpdates from './domUpdates';



window.addEventListener('load', returnData);

let travelers, trips, destinations

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
  displayFirstName()
}

///


function postTravelerInputs() {
  postTravelerData(travelerID, travelerName, travelerType)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        //?.innerText = "Success"
        // domUpdates.renderSubmittedHydration(hydrationInput.value)
      }
    })
    .catch(error => {
      // ?.innerText = "Fail";
      console.log(error)
    })
}

function postTripInputs() {
  postTripData(tripID, tripTravelerID, destinationID, numTravelers, tripDate, tripDuration, travelerStatus, tripStatus, suggestedActivities)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        // ???
      }
    })
    .catch(error => {
        // ???
      console.log(error)
    })
}

function postDestinationInputs() {
  postTravelerData(destinationID, destinationLocation, dailyLodgingCost, flightTicketCost, destinationImg)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        // ???
      }
    })
    .catch(error => {
        // ???
      console.log(error)
    })
}


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

// INSTANTIATE TRIP

function createTrip() {
  if (jetFormDate.value && jetFormDuration.value && jetFormNumHuman.value && jetFormDestinatio.value) {
    currentTrip = new Trip();
  }
}

// DOM UPDATES

function showEstimatedCost() {

  // const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
  // const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;

  // const costToDisplay = flightCost + lodgingCost;
  // estimatedCostHTML.innerHTML = `${costToDisplay}`


  if (!jetFormDate.value || !jetFormDuration.value || !jetFormNumHumans.value || !jetFormDestination.value) {
    alert('Please tell us all of the things!');
  }  else {
    estimatedCostHTML.innerText = `test`;
  }
}

function displayFirstName() {
  const name = traveler.getName();
  name.innerText = `${name}`;
}


// fetch the data. assign it to a variable. then filter the results based off your form values and present the options to the user (i.e. .map to return HTML cards)




// test

function testAlert() {
  alert("I am an alert box!");
}