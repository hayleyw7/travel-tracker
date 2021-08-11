const dom = {

  // renderFirstName(user) {
  //   console.log('poop');
  //   let name = document.getElementById('name');
  //   name.innerText = `${user.name}`;
  // },

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
},

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
  currentSlides: document.getElementById('currentSlides'),
  pendingSlides: document.getElementById('pendingSlides'),
  pastSlides: document.getElementById('pastSlides'),
  futureSlides: document.getElementById('futureSlides'),
  currentVibes: document.getElementById('currentVibes'),
  pendingVibes: document.getElementById('pendingVibes'),
  pastVibes: document.getElementById('pastVibes'),
  futureVibes: document.getElementById('futureVibes'),

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
