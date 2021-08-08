// NAVBAR
const name = document.getElementById('name');
const navBarLinksSection = document.getElementById('navBarLinksSection');
const navBarYourTripsBtn = document.getElementById('navBarYourTripsBtn');
const navBarTripPlannerBtn = document.getElementById('navBarTripPlannerBtn');

// LOGIN PAGE
const loginPage = document.getElementById('loginPage');
const loginFormUsername = document.getElementById('loginFormUsername');
const loginFormPassword = document.getElementById('loginFormPassword');
const loginFormSubmitBtn = document.getElementById('loginFormSubmitBtn');
const enterYourPassToPlan = document.getElementById('enterYourPassToPlan');

// YOUR TRIPS DASHBOARD PAGE
const yourTripsDashboardPage = document.getElementById('yourTripsDashboardPage');

// WANNA JET PAGE
const wannaJetPage = document.getElementById('wannaJetPage');
const jetFormDate = document.getElementById('jetFormDate');
const jetFormDuration = document.getElementById('jetFormDuration');
const jetFormHumans = document.getElementById('jetFormHumans');
const jetFormDestination = document.getElementById('jetFormDestination');
const jetFormSubmitBtn = document.getElementById('jetFormSubmitBtn');
const estimatedCostHTML = document.getElementById('estimatedCostHTML');
const letsJetBtn = document.getElementById('letsJetBtn');

const domUpdates = {

  renderFirstName(user) {
    // const name = document.getElementById('name');
    name.innerText = `${traveler.getName()}`;
  },

  // NAVBAR
  navBarLinksSection,
  navBarYourTripsBtn,
  navBarTripPlannerBtn,

  // LOGIN PAGE
  loginPage,
  loginFormUsername,
  loginFormPassword,
  loginFormSubmitBtn,

  // YOUR TRIPS DASHBOARD PAGE
  yourTripsDashboardPage,

  // WANNA JET PAGE
  wannaJetPage,
  jetFormDate,
  jetFormDuration,
  jetFormHumans,
  jetFormDestination,
  jetFormSubmitBtn,
  estimatedCostHTML,
  letsJetBtn
}

export default domUpdates