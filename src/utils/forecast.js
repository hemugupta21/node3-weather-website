const request = require('request');

const forecast = (latitude, longitude, callback) => {
//	if (!IsNumeric(latitude) || !IsNumeric(longitude)) {
//		callback('Invalid Values', undefined);
//	}
	
	const url = 'http://api.weatherstack.com/current?access_key=b62967fbfbfed64f3a083551c57bc92f&query=' + latitude + ',' + longitude;
	
	request({ url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to Connect to Weather forcasting service', undefined);
		} else if(body.error) {
			callback(body.error.info, undefined);
		} else {
			callback(undefined, {
				temperature: body.current.temperature,
				feelslike: body.current.feelslike
			})
		}
	})
}; 

module.exports = { 
		forecast: forecast
};