// IMPORTS & SETUP

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
  yearCost,
  currentSlides,
  pastSlides,
  pendingSlides,
  futureSlides,
  currentVibes,
  pastVibes,
  pendingVibes,
  futureVibes
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
jetFormSubmitBtn.addEventListener('click', dom.showEstimatedCost);
letsJetBtn.addEventListener('click', createTrip);

// API

function packPromises() {
  return Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()]);
}

///////////////////////////////////////////////////
//////////////////// FUNCTIONS ////////////////////
///////////////////////////////////////////////////



// PAGES (move all of these to the DOM)

// login page

function showLoginPage() {
  dom.hide([yourTripsDashboardPage, wannaJetPage, navBarSignOutBtn, navBarTripPlannerBtn, navBarSignOutBtn]);
  dom.show([loginPage]);
  name.innerText = `'Oh, the places you'll vibe!'`;
}

// trip planner page

function showWannaJetPage() {
  name.innerText = `${user.name}`;

  dom.hide([loginPage, yourTripsDashboardPage, navBarTripPlannerBtn]);
  dom.show([wannaJetPage, navBarYourTripsBtn, navBarSignOutBtn]);
  dom.populateDestinationsDropDown();
}

// dashboard page

function showYourTripsDashboardPage() {
  name.innerText = `${user.name}`;
  yearCost.innerHTML = `You've spent ${user.totalCostString()} on trips this year.`;
  dom.hide([loginPage, wannaJetPage, navBarYourTripsBtn]);
  dom.show([yourTripsDashboardPage, navBarTripPlannerBtn, navBarSignOutBtn]);

  // yourTripsDashboardPage.innerHTML += `${user.getTripsHTML()}`;

  populateTripSlides();

}

function populateTripSlides() {
  let slides = user.getTripsHTML();

  currentSlides.innerHTML = slides[0];
  pendingSlides.innerHTML = slides[1];
  futureSlides.innerHTML = slides[2];
  pastSlides.innerHTML = slides[3];

  if (slides[0].length > 0) {
    dom.show([currentVibes]);
  }
  if (slides[1].length > 0) {
    dom.show([pendingVibes]);
  }
  if (slides[2].length > 0) {
    dom.show([futureVibes]);
  }
  if (slides[3].length > 0) {
    dom.show([pastVibes]);
  }
}

// INSTANTIATE TRIP

function createTrip() {
  if (jetFormDate.value && jetFormDuration.value && jetFormHumans.value && jetFormDestination.value) {

    console.log(allDestinations);

    const destination = allDestinations.find(destinationObj => {
      console.log(jetFormDestination.value + ", " + destinationObj.id);
      if (parseInt(jetFormDestination.value) === destinationObj.id) {
        return true;
      }
      return false;
    })

    let destinationID = destination.id;

    // console.log(destinationID)

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

    console.log(trip)

    postBooking(trip).then(result => {
      if (result.ok) {

        console.log(result);

        user.addTrip(trip);
        user.addDestination(destination);

        allTrips.push(trip);

        showYourTripsDashboardPage();

      } else {
        console.log(result);
      }
    });
  }
}

// DOM UPDATES (will move to domUpdates after test working)

function login() {
  if (!loginFormPassword.value || !loginFormUsername.value) {
    enterYourPassToPlan.innerText = `Please fill in both fields.`;
  } else {

    const password = loginFormPassword.value;

    if (password === 'travel') {
      const username = loginFormUsername.value;
      const id = getID(username);

      if (id) {

        packPromises().then(

          promises => {
            travelers = promises[0].travelers;
            data = travelers.find(traveler => traveler.id === id);
            trips = promises[1].trips.filter(trip => trip.userID === id);
            destinations = promises[2].destinations.filter(destination => {
              return trips.some(trip => trip.destinationID === destination.id);
            });

            if (id > 0 && id <= travelers.length) {

              window.allDestinations = promises[2].destinations;
              window.allTrips = promises[1].trips;
              window.user = new Traveler(data, trips, destinations);

              showYourTripsDashboardPage();

            } else {
              replaceYOLO.innerText = `No dice!`;
              enterYourPassToPlan.innerText = `ID not found.`;
            }
          }
        );
      } else {
        replaceYOLO.innerText = `No dice!`;
        enterYourPassToPlan.innerText = `Your username is improperly formatted.`;
      }
    } else {
      replaceYOLO.innerText = `No dice!`;
      enterYourPassToPlan.innerText = `You need the right password.`;
    }
  }
}

// function getDestination(trip) {
//   return allDestinations.find(destination => destination.id === trip.destinationID);
// }