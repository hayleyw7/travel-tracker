const dom = {

  // TRIP PLANNER PAGE

  populateDestinationsDropDown() {
    allDestinations.sort((destinationObjA, destinationObjB) => {
      if (destinationObjA.destination < destinationObjB.destination) {
        return -1;
      } else {
        return 1
      }
    }).forEach((destinationObj) => {
      jetFormDestination.insertAdjacentHTML('beforeend', `<option value='${destinationObj.id}'>${destinationObj.destination}</option>`)
    })
  },

  showEstimatedCost() {
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

    let destination = allDestinations.find(destination => destination.id === trip.destinationID);

    if (!jetFormDate.value || !jetFormDuration.value || !jetFormHumans.value || !jetFormDestination.value) {
      estimatedCostHeaderHTML.innerText = `You tried & failed tbh :(`;
      estimatedCostHTML.innerText = `Please tell us all of the things and junk if you want us to make stuff happen and whatnot!`;
    }  else {

      var money = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      dom.show([letsJetBtn])
      estimatedCostHeaderHTML.innerHTML = `ESTIMATED COST: ${money.format(user.getTotal(trip, destination))}`
      estimatedCostHTML.innerHTML = `You will not be charged until an agent approves your request.`
    }
  },

  // LOGIN PAGE

  noDice(problem) {
    if (problem === 'id') {
      replaceYOLO.innerText = `No dice!`;
      enterYourPassToPlan.innerText = `ID not found.`;      
    } else if (problem === 'username') {
      replaceYOLO.innerText = `No dice!`;
      enterYourPassToPlan.innerText = `Your username is improperly formatted.`;        
    } else if (problem === 'password') {
      replaceYOLO.innerText = `No dice!`;
      enterYourPassToPlan.innerText = `You need the right password.`;          
    } else if (problem === 'empty') {
      replaceYOLO.innerText = `No dice!`;
      enterYourPassToPlan.innerText = `Please fill in both fields.`;    
    }
  },

  // PAGES

  // login page

  showLoginPage() {
    if (currentVibes) {
      dom.hide([currentVibes])
    }
    if (pastVibes) {
      dom.hide([pastVibes])
    }
    if (pendingVibes) {
      dom.hide([pendingVibes])
    }
    if (futureVibes) {
      dom.hide([futureVibes])
    }
    dom.hide([yourTripsDashboardPage, wannaJetPage, navBarSignOutBtn, navBarTripPlannerBtn, navBarSignOutBtn]);
    dom.show([loginPage]);
    namePhrase.innerText = `'Oh, the places you'll vibe!'`;
    loginFormToReset.reset();
  },

  // trip planner page

  showWannaJetPage() {
    namePhrase.innerText = `Yo, ${user.name}!`;

    dom.hide([loginPage, yourTripsDashboardPage, navBarTripPlannerBtn]);
    dom.show([wannaJetPage, navBarYourTripsBtn, navBarSignOutBtn]);
    dom.populateDestinationsDropDown();
    estimatedCostHeaderHTML.innerText = `ESTIMATED COST:`;
    estimatedCostHTML.innerText = `Enter your information on the left to see!`;
    plannerFormToReset.reset();
    dom.setCalendarMin();
  },

  setCalendarMin() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    } 
    
    if (mm < 10) {
      mm = '0' + mm;
    } 
    
    today = `${yyyy}-${mm}-${dd}`;
    jetFormDate.setAttribute("min", today);
  },

  // dashboard page

  showYourTripsDashboardPage() {
    namePhrase.innerText = `Yo, ${user.name}!`;
    yearCost.innerHTML = `You've spent ${user.totalCostString()} on trips this year.`;
    dom.hide([loginPage, wannaJetPage, navBarYourTripsBtn, letsJetBtn]);
    dom.show([yourTripsDashboardPage, navBarTripPlannerBtn, navBarSignOutBtn]);

    dom.populateTripSlides();
  },

  populateTripSlides() {
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
  },

  // HELPER FUNCTIONS

  hide(elements) {
    elements.forEach(element => {
      if (element.classList) {
        element.classList.add('hidden');
      }
    });
  },

  show(elements) {
    elements.forEach(element => {
      if (element.classList) {
        element.classList.remove('hidden');
      }
    });
  },

  // GET ELEMENT BY ID

  // navbar

  namePhrase: document.getElementById('namePhrase'),
  navBarLinksSection: document.getElementById('navBarLinksSection'),
  navBarYourTripsBtn: document.getElementById('navBarYourTripsBtn'),
  navBarTripPlannerBtn: document.getElementById('navBarTripPlannerBtn'),
  navBarSignOutBtn: document.getElementById('navBarSignOutBtn'),
  usernameSection: document.getElementById('usernameSection'),

  // login page

  loginPage: document.getElementById('loginPage'),
  loginFormUsername: document.getElementById('loginFormUsername'),
  loginFormPassword: document.getElementById('loginFormPassword'),
  loginFormSubmitBtn: document.getElementById('loginFormSubmitBtn'),
  enterYourPassToPlan: document.getElementById('enterYourPassToPlan'),
  replaceYOLO: document.getElementById('replaceYOLO'),
  loginFormToReset: document.getElementById('loginFormToReset'),

  // dashboard

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

  // wanna jet page

  wannaJetPage: document.getElementById('wannaJetPage'),
  jetFormDate: document.getElementById('jetFormDate'),
  jetFormDuration: document.getElementById('jetFormDuration'),
  jetFormHumans: document.getElementById('jetFormHumans'),
  jetFormDestination: document.getElementById('jetFormDestination'),
  jetFormSubmitBtn: document.getElementById('jetFormSubmitBtn'),
  estimatedCostHeaderHTML: document.getElementById('estimatedCostHeaderHTML'),
  estimatedCostHTML: document.getElementById('estimatedCostHTML'),
  letsJetBtn: document.getElementById('letsJetBtn'),
  plannerFormToReset: document.getElementById('plannerFormToReset')
}

export default dom;
