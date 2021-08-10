import {
  show,
  hide
} from './helpers';

const dom = {

  // renderFirstName(user) {
  //   let name = document.getElementById('name');
  //   name.innerText = `${user.name}`;
  // },

  // DOM UPDATES (will move to domUpdates after test working)

  // show/hide pages

  showLoginPage() {
    hide([yourTripsDashboardPage, wannaJetPage, navBarSignOutBtn, navBarTripPlannerBtn, navBarSignOutBtn]);
    show([loginPage]);
    name.innerText = `'Oh, the places you'll vibe!'`;
  }

  showWannaJetPage() {
    name.innerText = `${user.name}`;
    hide([loginPage, yourTripsDashboardPage, navBarTripPlannerBtn]);
    show([wannaJetPage, navBarYourTripsBtn, navBarSignOutBtn]);
    this.populateDestinationsDropDown();
  }

  showYourTripsDashboardPage() {
    name.innerText = `${user.name}`;
    hide([loginPage, wannaJetPage, navBarYourTripsBtn]);
    show([yourTripsDashboardPage, navBarTripPlannerBtn, navBarSignOutBtn]);
    yourTripsDashboardPage.innerHTML += `${user.getTripsHTML()}`
    user.totalCostString();
  }

  wrongPasswordNotice() {
    replaceYOLO.innerText = `No dice!`;
    enterYourPassToPlan.innerText = `You need the right password.`;
    yourTripsDashboardPage.innerHTML = `${user.getTripsHTMLPast()}` + `${user.getTripsHTMLPresent()}` + `${user.getTripsHTMLFuture()}` + `${user.getTripsHTMLPending()}`;
  }

  emptyLoginFieldNotice() {
    enterYourPassToPlan.innerText = `Please fill in both fields.`;
  }

  populateDestinationsDropDown() {
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

  showEstimatedCost() {
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

  // NAVBAR
  name: document.getElementById('name'),
  navBarLinksSection: document.getElementById('navBarLinksSection'),
  navBarYourTripsBtn: document.getElementById('navBarYourTripsBtn'),
  navBarTripPlannerBtn: document.getElementById('navBarTripPlannerBtn'),
  navBarSignOutBtn: document.getElementById('navBarSignOutBtn'),
  usernameSection: document.getElementById('usernameSection'),

  // LOGIN PAGE
  loginPage: document.getElementById('loginPage'),
  loginFormUsername: document.getElementById('loginFormUsername'),
  loginFormPassword: document.getElementById('loginFormPassword'),
  loginFormSubmitBtn: document.getElementById('loginFormSubmitBtn'),
  enterYourPassToPlan: document.getElementById('enterYourPassToPlan'),
  replaceYOLO: document.getElementById('replaceYOLO'),

  // YOUR TRIPS DASHBOARD PAGE
  yourTripsDashboardPage: document.getElementById('yourTripsDashboardPage'),
  destinationNameHTML: document.getElementById('destinationNameHTML'),
  dateTimeHTML: document.getElementById('dateTimeHTML'),
  yearCost: document.getElementById('yearCost'),

  // WANNA JET PAGE
  wannaJetPage: document.getElementById('wannaJetPage'),
  jetFormDate: document.getElementById('jetFormDate'),
  jetFormDuration: document.getElementById('jetFormDuration'),
  jetFormHumans: document.getElementById('jetFormHumans'),
  jetFormDestination: document.getElementById('jetFormDestination'),
  jetFormSubmitBtn: document.getElementById('jetFormSubmitBtn'),
  estimatedCostHeaderHTML: document.getElementById('estimatedCostHeaderHTML'),
  estimatedCostHTML: document.getElementById('estimatedCostHTML'),
  letsJetBtn: document.getElementById('letsJetBtn'),
}

export default dom;