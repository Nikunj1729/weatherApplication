const axios = require('axios')

const getGeoCode = (address, callback) => {
    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmlrdW5qMTcyOSIsImEiOiJjazc3NXpxOGgwNDFkM2dzNGl6a2Q0MnA1In0.mjeXJWFGlXhV1GupnBIDZw`
  
    axios({
      method: 'get',
      url: geoCodeUrl,
      responseType: 'json'
    })
      .then((response) => {
        const features = response.data.features[0];
        const [long, lat] = features.center;
        const place_name = features.place_name;
        callback(null, {long, lat, place_name})
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          const error = 'Unable to find location, try another search';
          callback(error)
        }
        else if (error) {
          const error = 'Unable to connect';
          console.log('Unable to connect')
          callback(error)
        }
      })
  }

  module.exports = getGeoCode