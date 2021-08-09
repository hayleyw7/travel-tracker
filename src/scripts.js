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
  dateTime,
  navBarSignOutBtn,
  replaceYOLO,
  estimatedCostHeaderHTML,
  name
} = dom;

// ***** STORAGE & SETUP *****

const storage = window.localStorage;
storage.setItem('activeUser', null);
storage.setItem('activeUserType', null);

let travelers, trips, destinations, data, allDestinations, allTrips;

// ***** EVENT LISTENERS *****

// NAVBAR
navBarYourTripsBtn.addEventListener('click', showYourTripsDashboardPage);
navBarTripPlannerBtn.addEventListener('click', showWannaJetPage);
navBarSignOutBtn.addEventListener('click', showLoginPage);

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
  event.preventDefault()
  hide([yourTripsDashboardPage, wannaJetPage, navBarSignOutBtn, navBarTripPlannerBtn, navBarSignOutBtn]);
  show([loginPage]);
}

function showWannaJetPage() {
  event.preventDefault();
  name.innerText = `Yo, ${user.name}!`;
  hide([loginPage, yourTripsDashboardPage, navBarTripPlannerBtn]);
  show([wannaJetPage, navBarYourTripsBtn, navBarSignOutBtn]);
  populateDestinationsDropDown();
}

function showYourTripsDashboardPage() {
  event.preventDefault();
  name.innerText = `Yo, ${user.name}!`;
  hide([loginPage, wannaJetPage, navBarYourTripsBtn]);
  show([yourTripsDashboardPage, navBarTripPlannerBtn, navBarSignOutBtn]);
  showTrips();
}

// INSTANTIATE TRIP

function createTrip() {
  if (jetFormDate.value && jetFormDuration.value && jetFormHumans.value && jetFormDestination.value) {
    const getDestinationID = allDestinations.find(destinationObj => {
      if (jetFormDestination.value === destinationObj) {
        return destinationObj.id
      }
      return getDestinationID;
    })
  
    const trip = new Trip(
      {
        "id": allTrips.length,
        "userID": user.id,
        "destinationID": getDestinationID,
        "travelers": jetFormHumans.value,
        "date": jetFormDate.value,
        "duration": jetFormDuration.value,
        "status": "pending",
        "suggestedActivities": []
      });
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



  if (!jetFormDate.value || !jetFormDuration.value || !jetFormHumans.value || !jetFormDestination.value) {
    estimatedCostHeaderHTML.innerText = `You tried & failed tbh :(`;
    estimatedCostHTML.innerText = `Please tell us all of the things and junk if you want us to make stuff happen and whatnot!`;
  }  else {
    // alert('Please tell us all of the things!');
    // estimatedCostHTML.innerText = `If you see this, THE BUG IS FIXED!`;

    // estimatedCostHTML.innerHTML = `${costToDisplay}`
    show([letsJetBtn])
    estimatedCostHeaderHTML.innerHTML = `ESTIMATED COST:`
    estimatedCostHTML.innerHTML = `[price here]`

  }
}

function login() {

  if (!loginFormPassword.value || !loginFormUsername.value) { 
    enterYourPassToPlan.innerText = `Please fill in both fields.`;
  } else {
  
    const password = loginFormPassword.value;

    if (password === "travel") {

      const username = loginFormUsername.value;
      const id = getID(username);

      packPromises().then(

        promises => {
          travelers = promises[0].travelers;
          data = travelers.find(traveler => traveler.id === id);
          trips = promises[1].trips.filter(trip => trip.userID === id);

          destinations = promises[2].destinations.filter(destination => {
            return trips.some(trip => trip.destinationID === destination.id);
          });

          allDestinations = promises[2].destinations;
          allTrips - promises[1].trips;

          window.user = new Traveler(data, trips, destinations);

          storage.setItem('activeUser', id);
        }
      );

      showYourTripsDashboardPage();
      
    } else {
      event.preventDefault()
      replaceYOLO.innerText = `No dice!`;
      enterYourPassToPlan.innerText = `You need the right password.`;
      yourTripsDashboardPage.innerHTML = `${user.getTripsHTML()}`;
    }
  }
}

function showCurrentTrip() {
  const displayThis = user.getTripsByStatus(trip.today, 'current');
  destinationNameHTML.innerText = `${displayThis.destination}`;
  dateTimeHTML.innerText = `${displayThis.date}`;
}

function showPendingTrips() {
  const displayThis = user.getTripsByStatus(trip.today, 'pending');
  destinationNameHTML.innerText = `${displayThis.destination}`;
  dateTimeHTML.innerText = `${displayThis.date}`;
}

function showFutureTrips() {
  const displayThis = user.getTripsByStatus(trip.today, 'approved');
  destinationNameHTML.innerText = `${displayThis.destination}`;
  dateTimeHTML.innerText = `${displayThis.date}`;
}

function showPastTrips() {
  const displayThis = user.getTripsByStatus(trip.today, 'past');
  destinationNameHTML.innerText = `${displayThis.destination}`;
  dateTimeHTML.innerText = `${displayThis.date}`;
}

function showTrips() {
  showCurrentTrip();
  showPendingTrips();
  showFutureTrips();
  showPastTrips();
}

function populateDestinationsDropDown() {
  allDestinations.sort((destinationObjA, destinationObjB) => {
    if (destinationObjA.destination < destinationObjB.destination) {
      return -1;
    } else {
      return 1
    }
  }).forEach((destinationObj) => {
    jetFormDestination.insertAdjacentHTML('beforeend', `
      <option value="${destinationObj.destination}">${destinationObj.destination}</option>
    `)
  })
}






// test

// function testAlert() {
//   alert("I am an alert box!");
// }

// help

// fetch the data. assign it to a variable. then filter the results based off your form values and present the options to the user (i.e. .map to return HTML cards)