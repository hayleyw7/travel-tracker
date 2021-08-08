const dom = {

  updateDashboard(message) {
    let dashboard = document.getElementById("dashboard");
    dashboard.innerText = message;
  },

  renderFirstName(user) {
    let name = document.getElementById('name');
    name.innerText = `${[user].getName()}`;
  },

  // NAVBAR
  navBarLinksSection: document.getElementById('navBarLinksSection');
  navBarYourTripsBtn: document.getElementById('navBarYourTripsBtn');
  navBarTripPlannerBtn: document.getElementById('navBarTripPlannerBtn');

  // LOGIN PAGE
  loginPage: document.getElementById('loginPage');
  loginFormUsername: document.getElementById('loginFormUsername');
  loginFormPassword: document.getElementById('loginFormPassword');
  loginFormSubmitBtn: document.getElementById('loginFormSubmitBtn');
  enterYourPassToPlan: document.getElementById('enterYourPassToPlan');

  // YOUR TRIPS DASHBOARD PAGE
  yourTripsDashboardPage: document.getElementById('yourTripsDashboardPage');

  // WANNA JET PAGE
  wannaJetPage: document.getElementById('wannaJetPage');
  jetFormDate: document.getElementById('jetFormDate');
  jetFormDuration: document.getElementById('jetFormDuration');
  jetFormHumans: document.getElementById('jetFormHumans');
  jetFormDestination: document.getElementById('jetFormDestination');
  jetFormSubmitBtn: document.getElementById('jetFormSubmitBtn');
  estimatedCostHTML: document.getElementById('estimatedCostHTML');
  letsJetBtn: document.getElementById('letsJetBtn');
}

export default dom;