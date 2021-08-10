//storage = window.localStorage;

export function fetchData(file) {

  let url = `http://localhost:3001/api/v1/${file}`;

  return fetch(url).then(response => response.json());

}

export function fetchTraveler(id) {

  return fetchData(`travelers/${id}`);

}

export function fetchTravelers() {

  return fetchData(`travelers`);

}

export function fetchTrips() {

  return fetchData('trips');

}

export function fetchDestinations() {

  return fetchData('destinations');

}

export function getID(username) {

  return parseInt(username.replace('traveler',''));

}

// POST

export function postBooking(trip) {
  let url = 'http://localhost:3001/api/v1/trips';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(trip),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
