const dom = {

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

  // HELPER FUNCTIONS

  hide(elements) {
    elements.forEach(element => {
      element.classList.add('hidden');
    });
  },

  show(elements) {
    elements.forEach(element => {
      element.classList.remove('hidden');
    });
  },

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
    } else if (problem === 'empty')
      replaceYOLO.innerText = `No dice!`;
      enterYourPassToPlan.innerText = `Please fill in both fields.`;       
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
