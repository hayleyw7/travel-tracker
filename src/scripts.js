  
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'





// import './css/styles.scss';

// import {
//   fetchData,
//   postHydrationData,
//   postActivityData,
//   postSleepData
// } from './apiCalls';

// import User from './User';
// import Activity from './Activity';
// import Hydration from './Hydration';
// import Sleep from './Sleep';
// import UserRepo from './User-repo';
// import domUpdates from './domUpdates';

// const {
//   hydrationButton,
//   hydrationInput,
//   hydrationHeader,
//   activityButton,
//   stepsInput,
//   minInput,
//   stairsInput,
//   activityHeader,
//   sleepButton,
//   hrInput,
//   qualInput,
//   sleepHeader
// } = domUpdates;

// window.addEventListener('load', returnData);
// hydrationButton.addEventListener('click', postHydrationInputs)

// let userData, hydrationData, sleepData, activityData, currentUser, userRepo, currentUserId, currentDate, startDate;

// function getData() {
//   return Promise.all([fetchData('users'), fetchData('hydration'), fetchData('sleep'), fetchData('activity')]);
// }

// function returnData() {
//   getData()
//     .then(promiseArray => {
//       userData = promiseArray[0].userData;
//       userRepo = new UserRepo(userData);
//       currentUser = new User(userRepo.getDataFromID(2));
//       currentUserId = currentUser.id;
//       currentDate = "2020/01/22";
//       startDate = "2020/01/15";
//     }).then(startApp);
// }

// function startApp() {
//   let hydrationRepo = new Hydration(hydrationData);
//   let sleepRepo = new Sleep(sleepData);

//   displayHistoricalWeek(randomHistory);
//   addInfoToSidebar(currentUser, userRepo);
// }

// function displayHistoricalWeek(randomHistory) {
//   domUpdates.renderHistoricalWeek(randomHistory);
// }

// function addInfoToSidebar(user, userStorage) {
//   const avStepGoal = userStorage.calculateAverageStepGoal();
//   displayFirstName(user);
//   displayInfoCard(user.name, user.address, user.email, user.strideLength, user.dailyStepGoal, avStepGoal);
// }

// function displayFirstName(user) {
//   domUpdates.renderFirstName(user);
// }

// function postHydrationInputs() {
//   if (hydrationInput.value > 0 && hydrationInput.value < 200) {
//     postHydrationData(currentUserId, currentDate, hydrationInput.value)
//       .then((response) => {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         } else {
//           hydrationHeader.innerText = "Great job! You have submitted your hydration data!"
//           domUpdates.renderSubmittedHydration(hydrationInput.value)
//         }
//       })
//       .catch(error => {
//         hydrationHeader.innerText = "Could not Fetch :( Check Internet?";
//         console.log(error)
//       })
//   } else if (hydrationInput.value > 200) {
//     hydrationHeader.innerText = "Calm down Aquaman - Input too high!"
//   } else {
//     hydrationHeader.innerText = "Please enter a number 0 or higher"
//   }
// }