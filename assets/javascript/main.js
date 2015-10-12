window.onload = function() {
	
	//get the elements we need to add text to from the API call.
	var temp = document.getElementById("temp");
	var cityState = document.getElementById("city-state");
	var info = document.getElementById("info");
	var windDir = document.getElementById("wind-dir");
	var weatherIcon = document.getElementById("weather-icon");
	var btn = document.getElementById('btn');
	
	
	//API Weather call
	var request = new XMLHttpRequest();
	request.open('GET','http://api.openweathermap.org/data/2.5/weather?zip=33101,us&format=json', true);
	request.send();
	
	request.onload = function() {
		if(request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText);
			
			//add text to temperature field
			var tempToFahrenheit = (data.main.temp - 273.15) * 9/5 + 32;
			temp.innerHTML = tempToFahrenheit.toFixed(1) + " F";
			
			//add functionality to change the icon depending on weather
			//change class name for <i> tag for different weather conditions
			if(tempToFahrenheit < 60 && tempToFahrenheit > 30) {
				weatherIcon.className = "fa fa-meh-o fa-2x";
			} else if(tempToFahrenheit > 60) {
				weatherIcon.className = "fa fa-smile-o fa-2x"
			} else {
				weatherIcon.className = "fa fa-frown-o fa-2x"
			}

			
			//add text to each section box
			cityState.innerHTML = data.name + ", " + data.sys.country
			info.innerHTML = data.weather[0].description;
			windDir.innerHTML = "Wind Speed: " + data.wind.speed;
			console.log(data);
		} else {
			console.log("Not working...");
		}
	}
	
	//button click
	//refactor at some point
	btn.addEventListener('click', function(e) {
		var temp = document.getElementById("temp").innerHTML;
		var lastLetter = temp.substr(temp.length - 1);
		temp = document.getElementById("temp");
		if(lastLetter === 'F') {
			var farhenheit = temp.innerHTML.slice(0, -2);
			var celcius = (farhenheit -32) * 5/9;
			temp.innerHTML = celcius + " C";
			var btn = document.getElementById('btn').innerHTML = "Change to Farenheit";
			
		} else {
			var celcius = temp.innerHTML.slice(0, -2);
			var farhenheit = (celcius * 9/5) + 32;
			temp.innerHTML = farhenheit + " F";
			var btn = document.getElementById('btn').innerHTML = "Change to Celcius";		
		}
		
	})
	
	
	//add form with input for zip code
	//get api data from user input
}