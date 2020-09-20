const request = require('request');

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGVtdWd1cHRhMjEiLCJhIjoiY2tlY3podXdvMDR4MzJ5b2NodXlva2FrZyJ9.cfW00dKrlAzLz1wH8E9KMg&limit=1';
	
	request({ url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to Connect to Geo coding service', undefined);
		} else if(body.features.length === 0) {
			callback('No response found for entered Geo Location', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
};

module.exports = {
		geocode: geocode
};