const path 		= require('path');
const express	= require('express');
const hbs		= require('hbs');
const geocode 	= require('./utils/geocode.js'); 
const forecast 	= require('./utils/forecast.js'); 

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const pathDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(pathDirectoryPath)); 

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather Application',
		name: 'Himanshu Gupta'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Himanshu Gupta'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'Let me help you',
		name: 'Himanshu Gupta'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
					Error: 'Please provide the Address Parameter',
				});
	} 
	
	geocode.geocode(req.query.address, (error, {latitude, longitude, location = {}} = {}) => {
		if (error) {
			return res.send({
				Error: error,
			});
		}
		
		forecast.forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					Error: error,
				}); 
			} 
			
			res.send({
				location: location,
				forecast: 'It is currently ' + forecastData.temperature + ' degrees out. But, it feels alike ' + forecastData.feelslike,
				address : req.query.address
			}); 
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Himanshu Gupta',
		errorMessage: 'Help article not found'
		
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Himanshu Gupta',
		errorMessage: 'Page not found'
		
	});
});

app.listen(port, () => {
	console.log('Server is up for port ' + port);
});

//app.get('', (req, res) => {
//	res.send('<h1>Hello, this is my first node.js web server</h1>');
//});
//
//app.get('/help', (req, res) => {
//	res.send({
//		name: 'Himanshu'
//	});
//});
//
//app.get('/about', (req, res) => {
//	res.send('<h2>Hello, I am Himanshu Gupta</h2>');
//});