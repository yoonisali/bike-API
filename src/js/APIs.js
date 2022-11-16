
export default class LocationService {
  static getLocation(city) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=10&location=${city}&distance=10&stolenness=proximity`;
      
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, city]);
        } else {
          reject([this, response, city]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
    


  }

}

