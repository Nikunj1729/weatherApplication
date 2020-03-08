const axios = require('axios')

const getWeatherForecast = ({lat, long}, callback) => {

    const url = `https://api.darksky.net/forecast/62696593c786b62fe82dae20a9c42171/${lat},${long}?units=si`;
  
    axios({
    method: 'get',
    url,
    responseType: 'json'
    })
    .then((response) => {
        const currentData = response.data.currently;
        const summary = response.data.daily.data[0].summary;
        const weatherPrediction = `${summary} It is currently ${currentData.temperature} degrees out. There is a ${currentData.precipProbability}% chance of rain.`;
        callback(null, weatherPrediction)
    })
    .catch((error) => {
        if (error.response && error.response.data.error) {
            const error = 'Unable to predict weather';
            callback(error)
        }
        else if (error) {
            const error = 'Unable to connect';
            callback(error)
        }
    })
  }

  module.exports = getWeatherForecast