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
  name,
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
  letsJetBtn
} = domUpdates;

// ***** EVENT LISTENERS *****

window.addEventListener('load', returnData);

// NAVBAR
navBarYourTripsBtn.addEventListener('click', showYourTripsDashboardPage);
navBarTripPlannerBtn.addEventListener('click', showWannaJetPage);

// LOGIN PAGE
// loginFormUsername.addEventListener('click', functionhere);
// loginFormPassword.addEventListener('click', functionhere);
// loginFormSubmitBtn.addEventListener('click', functionhere);

// WANNA JET PAGE
// jetFormDate.addEventListener('click', functionhere);
// jetFormDuration.addEventListener('click', functionhere);
// jetFormHumans.addEventListener('click', functionhere);
// jetFormDestination.addEventListener('click', functionhere);
jetFormSubmitBtn.addEventListener('click', showEstimatedCost);
// estimatedCostHTML.addEventListener('click', functionhere);
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
  renderFirstName()
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
  if (jetFormDate.value && jetFormDuration.value && jetFormHumans.value && jetFormDestinatio.value) {
    currentTrip = new Trip();
  }
}

// DOM UPDATES (will move to domUpdates after test working)

function showEstimatedCost() {

  // const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
  // const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;

  // const costToDisplay = flightCost + lodgingCost;
  // estimatedCostHTML.innerHTML = `${costToDisplay}`


  if (jetFormDate.value && jetFormDuration.value && jetFormHumans.value && jetFormDestination.value) {
    estimatedCostHTML.innerText = `test`;
  }  else {
    alert('Please tell us all of the things!');
  }
}

// test

function testAlert() {
  alert("I am an alert box!");
}

// help

// fetch the data. assign it to a variable. then filter the results based off your form values and present the options to the user (i.e. .map to return HTML cards)