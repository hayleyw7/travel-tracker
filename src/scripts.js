///////////////////////////////////////////////////
///////////////// IMPORTS & SETUP /////////////////
///////////////////////////////////////////////////

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
  namePhrase,
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

///////////////////////////////////////////////////
///////////////// EVENT LISTENERS /////////////////
///////////////////////////////////////////////////

// navbar
navBarYourTripsBtn.addEventListener('click', dom.showYourTripsDashboardPage);
navBarTripPlannerBtn.addEventListener('click', dom.showWannaJetPage);
navBarSignOutBtn.addEventListener('click', dom.showLoginPage);

// login page
loginFormSubmitBtn.addEventListener('click', login);

// trip planner page
jetFormSubmitBtn.addEventListener('click', dom.showEstimatedCost);
letsJetBtn.addEventListener('click', createTrip);

///////////////////////////////////////////////////
/////////////////////// API ///////////////////////
///////////////////////////////////////////////////

// FETCH

function packPromises() {
  return Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()]);
}

function login() {
  if (!loginFormPassword.value || !loginFormUsername.value) {
    dom.noDice('empty');
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

              dom.showYourTripsDashboardPage();

            } else {
              dom.noDice('id');
            }
          }
        );
      } else {
        dom.noDice('username');
      }
    } else {
      dom.noDice('password');
    }
  }
}

// POST

function createTrip() {
  if (jetFormDate.value && jetFormDuration.value && jetFormHumans.value && jetFormDestination.value) {

    console.log(allDestinations);

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

    console.log(trip)

    postBooking(trip).then(result => {
      if (result.ok) {

        console.log(result);

        user.addTrip(trip);
        user.addDestination(destination);

        allTrips.push(trip);

        dom.showYourTripsDashboardPage();

      } else {
        console.log(result);
      }
    });
  }
}