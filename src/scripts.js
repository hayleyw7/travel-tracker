import './css/base.scss';

import {
  fetchData,
  fetchTraveler,
  fetchTravelers,
  fetchTrips,
  fetchDestinations,
  getID
  // postTravelerData,
  // postDestinationData,
  // postTripData
} from './apiCalls';

import dom from './domUpdates';
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
  enterYourPassToPlan,
  destinationNameHTML,
  dateTime
} = dom;

// ***** STORAGE & SETUP *****

const storage = window.localStorage;
storage.setItem('activeUser', null);
storage.setItem('activeUserType', null);

let travelers, trips, destinations, data;

// ***** EVENT LISTENERS *****

// NAVBAR
navBarYourTripsBtn.addEventListener('click', showYourTripsDashboardPage);
navBarTripPlannerBtn.addEventListener('click', showWannaJetPage);

// LOGIN PAGE
loginFormSubmitBtn.addEventListener('click', login);

// WANNA JET PAGE
jetFormSubmitBtn.addEventListener('click', showEstimatedCost);
letsJetBtn.addEventListener('click', createTrip);

// ***** API STUFF *****

function packPromises() {

  return Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()]);

}

///

// function postTravelerInputs() {
//   postTravelerData(travelerID, travelerName, travelerType)
//     .then((response) => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       } else {
//         //?.innerText = "Success"
//         // dom.renderSubmittedHydration(hydrationInput.value)
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
  // populateDestinationsDropDown();
}

function showYourTripsDashboardPage() {
  hide([loginPage, wannaJetPage]);
  show([navBarLinksSection, yourTripsDashboardPage]);
  showTrips()
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

  // const costWithoutAgent = (flightCost + lodgingCost) * 2;
  // const travelAgentFactor = 1.1;
  // const costToDisplay = travelAgentFactor * costWithoutAgent;

  // estimatedCostHTML.innerHTML = `${costToDisplay}`

  if (!jetFormDate.value || !jetFormDuration.value || !jetFormHumans.value || !jetFormDestination.value) {
    estimatedCostHTML.innerText = `Please tell us all of the things if you want us to make stuff happen and such!`;
  }  else {
    // alert('Please tell us all of the things!');
    estimatedCostHTML.innerText = `If you see this, THE BUG IS FIXED!`;
  }
}

function login() {

  if (!loginFormPassword.value || !loginFormUsername.value) { 
    enterYourPassToPlan.innerText = `Please fill in both fields.`;
  } else {
  
    const password = dom.loginFormPassword.value;

    if (password === "travel") {

      const username = dom.loginFormUsername.value;
      const id = getID(username);

      packPromises().then(

        promises => {
          travelers = promises[0].travelers;
          data = travelers.find(traveler => traveler.id === id);
          trips = promises[1].trips.filter(trip => trip.userID === id);

          destinations = promises[2].destinations.filter(destination => {
            return trips.some(trip => trip.destinationID === destination.id);
          });

          window.user = new Traveler(data, trips, destinations);

          storage.setItem('activeUser', id);
        }
      );

      showYourTripsDashboardPage();
      
    } else {

      dom.updateDashboard("No dice. Need the right password.");

    }
  }
}

function showCurrentTrip() {
  const displayThis = user.getTripsByStatus(trip.today, 'current');

  destinationNameHTML.innerText(`${displayThis.destination}`);

  dateTimeHTML.innerText(`${displayThis.date}`);
}

function showPendingTrips() {
  const displayThis = user.getTripsByStatus(trip.today, 'pending');

  destinationNameHTML.innerText(`${displayThis.destination}`);

  dateTimeHTML.innerText(`${displayThis.date}`);
}

function showFutureTrips() {
  const displayThis = user.getTripsByStatus(trip.today, 'approved');

  destinationNameHTML.innerText(`${displayThis.destination}`);

  dateTimeHTML.innerText(`${displayThis.date}`);
}

function showPastTrips() {
  const displayThis = user.getTripsByStatus(trip.today, 'past');

  destinationNameHTML.innerText(`${displayThis.destination}`);

  dateTimeHTML.innerText(`${displayThis.date}`);
}

function showTrips() {
  showCurrentTrip();
  showPendingTrips();
  showFutureTrips();
  showPastTrips();
}

function populateDestinationsDropDown() {
  const result = this.destinations.map((destination) => {
  jetFormDestination.innerHTML += `
    <option value="${destination.destination}">${destination.destination}</option>
  `
  })
  return result;
}






// test

// function testAlert() {
//   alert("I am an alert box!");
// }

// help

// fetch the data. assign it to a variable. then filter the results based off your form values and present the options to the user (i.e. .map to return HTML cards)