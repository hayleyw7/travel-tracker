export function fetchData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`).then(response => response.json());
}

//////


window.fetchTraveler = () => {

  var username = document.querySelector("#username").value;
  var password = document.querySelector("#password").value;

  if (password === "travel") {

    id = getID(username);

    const url = 'http://localhost:3001/api/v1/travelers/' + id;

    fetch(url)
    .then(response => response.json())
    .then(data => document.getElementById("dashboard").innerHTML = data.name);

  } else {

    document.getElementById("dashboard").innerHTML = "No dice! Try another password."

  }

}

window.getTravelers = () => {

  fetch('http://localhost:3001/api/v1/travelers/')
  .then(response => response.json())
  .then(data => {
    document.getElementById("dashboard").innerHTML = data.travelers;
  })

}

function getID(username) {

  console.log(username);
  return username.replace('traveler','');

}



///////


// export function postTravelerData(travelerID, travelerName, travelerType) {
//   let body = {
//     "id": travelerID,
//     "name": travelerName,
//     "travelerType": travelerType
//   }
//   return fetch(`http://localhost:3001/api/v1/travelers`, {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {
//       'Content-type': 'application/json'
//     }
//   })

//   export function postTripData(tripID, tripTravelerID, destinationID, numTravelers, tripDate, tripDuration, travelerStatus, tripStatus, suggestedActivities) {
//   let body = {
//     "id": tripID,
//     "userID": tripTravelerID,
//     "destinationID": destinationID,
//     "travelers": numTravelers,
//     "date": tripDate,
//     "duration": tripDuration,
//     "status": travelerStatus,
//     "approved": tripStatus,
//     "suggestedActivities": suggestedActivities
//   }
//   return fetch(`http://localhost:3001/api/v1/trips`, {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {
//       'Content-type': 'application/json'
//     }
//   })

//   export function postDestinationData(destinationID, destinationLocation, dailyLodgingCost, flightTicketCost, destinationImg) {
//   let body = {
//     "id": destinationID,
//     "destination": destinationLocation,
//     "estimatedLodgingCostPerDay": dailyLodgingCost,
//     "estimatedFlightCostPerPerson": flightTicketCost,
//     "image": destinationImg
//   }
//   return fetch(`http://localhost:3001/api/v1/destinations`, {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {
//       'Content-type': 'application/json'
//     }
//   })
// }

