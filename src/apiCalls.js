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
}

