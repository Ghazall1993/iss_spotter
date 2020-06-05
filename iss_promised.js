const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
  // let options = {
  //   uri: 'https://api.ipify.org?format=json',
  //   json: true // Automatically parses the JSON string in the response
  // };

  // request(options)
  //   .then(function (ip) {
  //       callback(null,ip);
  //   })
  //   .catch(function (err) {
  //       //catch eror
  //   });
}

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const res = JSON.parse(body).response;
      return res;
    });
};

module.exports = { nextISSTimesForMyLocation };

