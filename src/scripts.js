// IMPORTS & SETUP

import './css/base.scss';
import Glide from '@glidejs/glide';

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
  // currentSlides,
  // pastSlides,
  pendingSlides
  // futureSlides
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

function packPromises() {
  return Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()]);
}

///////////////////////////////////////////////////
//////////////////// FUNCTIONS ////////////////////
///////////////////////////////////////////////////

// HELPER FUNCTIONS

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

// PAGES (move all of these to the DOM)

// login page

function showLoginPage() {
  hide([yourTripsDashboardPage, wannaJetPage, navBarSignOutBtn, navBarTripPlannerBtn, navBarSignOutBtn]);
  show([loginPage]);
  name.innerText = `'Oh, the places you'll vibe!'`;
}

// trip planner page

function showWannaJetPage() {
  name.innerText = `${user.name}`;
  hide([loginPage, yourTripsDashboardPage, navBarTripPlannerBtn]);
  show([wannaJetPage, navBarYourTripsBtn, navBarSignOutBtn]);
  populateDestinationsDropDown();
}

// dashboard page

function showYourTripsDashboardPage() {
  name.innerText = `${user.name}`;
  yearCost.innerHTML = `You've spent ${user.totalCostString()} on trips this year.`;
  hide([loginPage, wannaJetPage, navBarYourTripsBtn]);
  show([yourTripsDashboardPage, navBarTripPlannerBtn, navBarSignOutBtn]);

  // yourTripsDashboardPage.innerHTML += `${user.getTripsHTML()}`;

  populateTripSlides();
  
  // let glide = new Glide('.glide').mount();
}

function populateTripSlides() {
  let slides = user.getTripsHTML();

  // currentSlides.innerHTML = slides[0];
  pendingSlides.innerHTML = slides[1];
  // futureSlides.innerHTML = slides[2];
  // pastSlides.innerHTML = slides[3];
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

        showYourTripsDashboardPage();

      } else {
        console.log(result);
      }
    });
  }
}

// DOM UPDATES (will move to domUpdates after test working)

function showEstimatedCost() {
  let trip = 
    {
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

          let glide = new Glide('.glide').mount();

          showYourTripsDashboardPage();
        }
      );
      
    } else {
      replaceYOLO.innerText = `No dice!`;
      enterYourPassToPlan.innerText = `You need the right password.`;
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

function getDestination(trip) {
  return allDestinations.find(destination => destination.id === trip.destinationID);
}
