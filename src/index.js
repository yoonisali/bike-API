import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import LocationService from './js/APIs.js';

// Business Logic

function getLocation(city) {
  let promise = LocationService.getLocation(city);
  promise.then(function (locationDataArray) {
    printElements(locationDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// UI Logic

function printElements(data) {
  document.querySelector('#showContent').innerText = `The bikes found stolen in ${data[1]} are:`;
  let stolenBikes = data[0].bikes;
  stolenBikes.forEach(function (element) {
    if (element.stolen) {
      let newH2 = document.createElement('h2');
      let newPdescribe = document.createElement('p');
      let newP = document.createElement('p');
      newH2.innerHTML = element.frame_model;
      if (element.description !== null) {
        newPdescribe.innerHTML = `Description: ${element.description}`;
      }
      newP.innerHTML = `Location: ${element.stolen_location}`;
      document.getElementById('stolen-display').append(newH2);
      document.getElementById('stolen-display').append(newPdescribe);
      document.getElementById('stolen-display').append(newP);
    }
  });
}

function printError(error) {
  document.querySelector('#showContent').innerText = `There was an error accessing the stolen bike data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  document.getElementById('stolen-display').innerHTML = null;
  getLocation(city);
}

window.addEventListener("load", function () {
  document.getElementById('all').addEventListener("submit", handleFormSubmission);
});