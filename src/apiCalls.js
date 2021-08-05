export function fetchData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`).then(response => response.json());
}

export function postTravelerData(travelerID, travelerName, travelerType) {
  let body = {
    "id": travelerID,
    "name": travelerName,
    "travelerType": travelerType
  }
  return fetch(`http://localhost:3001/api/v1/travelers`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })

  export function postTripData(tripID, tripTravelerID, destinationID, numTravelers, tripDate, tripDuration, travelerStatus, tripStatus, suggestedActivities) {
  let body = {
    "id": tripID,
    "userID": tripTravelerID,
    "destinationID": destinationID,
    "travelers": numTravelers,
    "date": tripDate,
    "duration": tripDuration,
    "status": travelerStatus,
    "approved": tripStatus,
    "suggestedActivities": suggestedActivities
  }
  return fetch(`http://localhost:3001/api/v1/trips`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
}