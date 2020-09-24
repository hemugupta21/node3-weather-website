console.log('Run the Java script file');
const weatherForm = document.querySelector('form');
const search      = document.querySelector('input');
const messageOne  = document.querySelector('#message-1');
const messageTwo  = document.querySelector('#message-2');

messageOne.textContent = 'Use Search to know the weather';
messageTwo.textContent = '';
weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location 	= search.value;
	const fetchInfo = '/weather?address=' + location;
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	fetch(fetchInfo).then((response) => {
		response.json().then((data) => {
			if (data.Error) {
				messageOne.textContent = data.Error;
				//console.log(data.Error);
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
				//console.log(data.location);
				//console.log(data.forecast);	
			} 				
		})
	})
})