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

navBarYourTripsBtn.addEventListener('click', dom.showYourTripsDashboardPage);
navBarTripPlannerBtn.addEventListener('click', dom.showWannaJetPage);
navBarSignOutBtn.addEventListener('click', dom.showLoginPage);

// login page

loginFormSubmitBtn.addEventListener('click', login);

// trip planner page

jetFormSubmitBtn.addEventListener('click', dom.showEstimatedCost);
letsJetBtn.addEventListener('click', createTrip);

// API

// fetch

function packPromises() {
  return Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()]);
}

function login() {
  if (!loginFormPassword.value || !loginFormUsername.value) { 
    emptyLoginFieldNotice();
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
      wrongPasswordNotice();
    }
  }
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

  // login page

  login() {
    if (!loginFormPassword.value || !loginFormUsername.value) { 
      dom.emptyLoginFieldNotice();
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
        dom.wrongPasswordNotice();
      }
    }
  }

///////////////////////////////////////////////////
//////////////////// QUESTIONS ////////////////////
///////////////////////////////////////////////////

// this is only used once - should i just work it into the code & delete it?

function getDestination(trip) {
  return allDestinations.find(destination => destination.id === trip.destinationID);
}