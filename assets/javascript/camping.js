$(document).ready(function() {

// array of states and abbrivs
	const stateArr = [
	{state:"Alabama", abbr: "AL"}, {state:"Alaska", abbr: "AK"},{state:"Arizona", abbr: "AZ"},{state:"Arkansas", abbr: "AR"},
	{state:"California", abbr: "CA"},{state:"Colorado", abbr: "CO"},{state:"Connecticut", abbr: "CT"},{state:"Delaware", abbr: "DE"},
	{state:"Florida", abbr: "FL"},{state:"Georgia", abbr: "GA"},{state:"Hawaii", abbr: "HI"},{state:"Idaho", abbr: "ID"},
	{state:"Illinois", abbr: "IL"}, {state:"Indiana", abbr: "IN"},{state:"Iowa", abbr: "IA"},{state:"Kansas", abbr: "KS"},
	{state:"Kentucky", abbr: "KY"},{state:"Louisiana", abbr: "LA"},{state:"Maine", abbr: "ME"},{state:"Maryland", abbr: "MD"},
	{state:"Massachusetts", abbr: "MA"},{state:"Michigan", abbr: "MI"},{state:"Minnesota", abbr: "MN"},{state:"Mississippi", abbr: "MS"},
	{state:"Missouri", abbr: "MO"}, {state:"Montana", abbr: "MT"},{state:"Nebraska", abbr: "NE"},{state:"Nevada", abbr: "NV"},
	{state:"New Hampshire", abbr: "NH"},{state:"New Jersey", abbr: "NJ"},{state:"New Mexico", abbr: "NM"},{state:"New York", abbr: "NY"},
	{state:"North Carolina", abbr: "NC"},{state:"North Dakota", abbr: "ND"},{state:"Ohio", abbr: "OH"},{state:"Oklahoma", abbr: "OK"},
	{state:"Oregon", abbr: "OR"}, {state:"Pennsylvania", abbr: "PA"},{state:"Rhode Island", abbr: "RI"},{state:"South Carolina", abbr: "SC"},
	{state:"South Dakota", abbr: "SD"},{state:"Tennessee", abbr: "TN"},{state:"Texas", abbr: "TX"},{state:"Utah", abbr: "UT"},
	{state:"Vermont", abbr: "VT"},{state:"Virginia", abbr: "VA"},{state:"Washington", abbr: "WA"},{state:"West Virginia", abbr: "WV"},
	{state:"Wisconsin", abbr: "WI"},{state:"Wyoming", abbr: "WY"}
	]

	//looping through and displaying each state in the above array as well as
	//giving it the value of abbr
	for (let i = 0; i < stateArr.length; i++){

		let newDiv = $('<div class="stateDiv">');

		let abbr = stateArr[i].abbr;

		newDiv.html('<button value="'+stateArr[i].abbr+'" class="stateName">' + stateArr[i].state + '</button>');

		// newDiv.attr("value", 'stateArr[i].abbr');

		$("#container").append(newDiv);
	}

	//with the value abbr we can then access the api when the user clicks
	//without any input and we return the response
	$(".stateName").on('click', function(){
		
		let abbr = $(this).val();

		console.log(abbr);


	const queryURL = "https://api.amp.active.com/camping/campgrounds/?pstate=" + abbr
	+ "&json=true&api_key=8av4h3s7ecqejs3gbhcj6q6h";
	const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';



    $.ajax({
    	url: proxyUrl + queryURL,
    	method: "GET",
    	headers:{
    		authorization: 'Bearer ' + '8av4h3s7ecqejs3gbhcj6q6h'

    	}
    }).done(response => {
    	
    	window.res = response;

    	let name = $(res).find('result').each(function(r) { 
    		let nameTwo = $(this).attr('facilityName');
    		console.log(nameTwo);
    		
    	})





 		// Map
    	 $(res).find('result').each(function(r) {
    		let lat = $(this).attr('latitude');
    		let long = $(this).attr('longitude');
    		console.log(lat);
    		console.log(long);

    		
    		mapboxgl.accessToken = 'pk.eyJ1IjoiYnJvd25jb2F0IiwiYSI6ImNqY2Nvb3NibjBpbWIyeW50NHZ6cGZmODUifQ.tAp8DhP9budvHomRqyv0lg';
			var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/outdoors-v10'
			});

			let markerImg = new Image();
			markerImg.src = 'assets/images/marker.png';
			markerImg.style.height = '30px';
    		markerImg.style.width = '30px';

			let marker = new mapboxgl.Marker(markerImg)
			.setLngLat([long, lat])
			.addTo(map)

			map.addControl(new mapboxgl.NavigationControl());
			// end map

			// weather
			const queryURLWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + 
    		"&APPID=187fb301a3565644c00135af35769e08";
    		

	    	$.ajax({
	    		url: queryURLWeather,
	    		method: "GET"
	    	}).done(function(weatherResponse) {
	    		console.log(weatherResponse.city.name);
	    		console.log(weatherResponse.list[0].main);
	    	})
	    	// end weather
    		
			
	
		})
	
    })
	
	//save for later allows to show allows to clear the page without changing files
	$('#home').on('click', function(){
		$('#wholeContainer').show();
	})

	
})
// closing tag for document ready
});
