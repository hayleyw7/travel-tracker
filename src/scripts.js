///////////////////////////////////////////////////
////////////////////// SETUP //////////////////////
///////////////////////////////////////////////////

// IMPORTS

import './css/base.scss';

import {
  fetchData,
  fetchTraveler,
  fetchTravelers,
  fetchTrips,
  fetchDestinations,
  postBooking,
  getID
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
  name,
  yearCost
} = dom;

let travelers, trips, destinations, data;

// EVENT LISTENERS

// navbar

navBarYourTripsBtn.addEventListener('click', showYourTripsDashboardPage);
navBarTripPlannerBtn.addEventListener('click', showWannaJetPage);
navBarSignOutBtn.addEventListener('click', showLoginPage);

// login page

loginFormSubmitBtn.addEventListener('click', login);

// trip planner page

jetFormSubmitBtn.addEventListener('click', showEstimatedCost);
letsJetBtn.addEventListener('click', createTrip);

// API

// fetch

function packPromises() {
  return Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()]);
}

// post

function createTrip() {
  if (jetFormDate.value && jetFormDuration.value && jetFormHumans.value && jetFormDestination.value) {
    const destination = allDestinations.find(destinationObj => {

      if (parseInt(jetFormDestination.value) === destinationObj.id) {
        return true;
      }
      return false;
    })

    let destinationID = destination.id;
  
    const trip = {
      'id': allTrips.length + 1,
      'userID': user.id,
      'destinationID': destinationID,
      'travelers': parseInt(jetFormHumans.value),
      'date': jetFormDate.value.split('-').join('/'),
      'duration': parseInt(jetFormDuration.value),
      'status': 'pending',
      'suggestedActivities': []
    };

    postBooking(trip).then(result => {
      if (result.ok) {
        user.addTrip(trip);
        user.addDestination(destination);

        showYourTripsDashboardPage();

      } else {
        // console.log(result);
      }
    });
  }
}

///////////////////////////////////////////////////
//////////////////// FUNCTIONS ////////////////////
///////////////////////////////////////////////////

// DOM UPDATES (will move to domUpdates after test working)

// show/hide pages

function showLoginPage() {
  hide([yourTripsDashboardPage, wannaJetPage, navBarSignOutBtn, navBarTripPlannerBtn, navBarSignOutBtn]);
  show([loginPage]);
  name.innerText = `'Oh, the places you'll vibe!'`;
}

function showWannaJetPage() {
  name.innerText = `${user.name}`;
  hide([loginPage, yourTripsDashboardPage, navBarTripPlannerBtn]);
  show([wannaJetPage, navBarYourTripsBtn, navBarSignOutBtn]);
  populateDestinationsDropDown();
}

function showYourTripsDashboardPage() {
  name.innerText = `${user.name}`;
  hide([loginPage, wannaJetPage, navBarYourTripsBtn]);
  show([yourTripsDashboardPage, navBarTripPlannerBtn, navBarSignOutBtn]);
  yourTripsDashboardPage.innerHTML += `${user.getTripsHTML()}`
  user.totalCostString();
}

// login page

function login() {
  if (!loginFormPassword.value || !loginFormUsername.value) { 
    enterYourPassToPlan.innerText = `Please fill in both fields.`;
  } else {
  
    const password = loginFormPassword.value;

    if (password === 'travel') {
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

          window.allDestinations = promises[2].destinations;
          window.allTrips = promises[1].trips;
          window.user = new Traveler(data, trips, destinations);
          showYourTripsDashboardPage();
        }
      );
      
    } else {
      replaceYOLO.innerText = `No dice!`;
      enterYourPassToPlan.innerText = `You need the right password.`;
      yourTripsDashboardPage.innerHTML = `${user.getTripsHTMLPast()}` + `${user.getTripsHTMLPresent()}` + `${user.getTripsHTMLFuture()}` + `${user.getTripsHTMLPending()}`;
    }
  }
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
      <option value='${destinationObj.id}'>${destinationObj.destination}</option>
    `)
  })
}

// trip planner

function showEstimatedCost() {
  let trip = {
    'id': allTrips.length + 1,
    'userID': user.id,
    'destinationID': parseInt(jetFormDestination.value),
    'travelers': parseInt(jetFormHumans.value),
    'date': jetFormDate.value,
    'duration': parseInt(jetFormDuration.value),
    'status': 'pending',
    'suggestedActivities': []
  };

  let destination = getDestination(trip);

  if (!jetFormDate.value || !jetFormDuration.value || !jetFormHumans.value || !jetFormDestination.value) {
    estimatedCostHeaderHTML.innerText = `You tried & failed tbh :(`;
    estimatedCostHTML.innerText = `Please tell us all of the things and junk if you want us to make stuff happen and whatnot!`;
  }  else {

    var money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    show([letsJetBtn])
    estimatedCostHeaderHTML.innerHTML = `ESTIMATED COST: ${money.format(user.getTotal(trip, destination))}`
    estimatedCostHTML.innerHTML = `You will not be charged until an agent approves your request.`
  }
}

// HELPER FUNCTIONS (move these to a new file)

// show/hide

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

// this is only used once - should i just work it into the code & delete it?

function getDestination(trip) {
  return allDestinations.find(destination => destination.id === trip.destinationID);
}