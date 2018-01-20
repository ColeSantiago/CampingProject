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
		
		let campName = $('#camp-name');
		campName.empty();
		
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
    	console.log(response);

    		let name = $(res).find('result').each(function(r) { 


    		let nameTwo = $(this).attr('facilityName');

    		let lat = $(this).attr('latitude');
    		// console.log(lat);
    		let long = $(this).attr('longitude');
    		// console.log(long);
    		let photo = $('<img>')
    		photo.addClass('facility-photo')
    		photo.attr('src', $(this).attr('facilityPhoto'))

    		let facilityId = $(this).attr('facilityID');
    		

    		let contractId = $(this).attr('contractID');
    		



    		let campArray = [];
    		let longArray = [];
    		let latArray = [];
    		let facilityArray = [];
    		let contractArray = [];

    		longArray.push(long);
    		latArray.push(lat);
    		campArray.push(nameTwo);
    		facilityArray.push(facilityId);
    		contractArray.push(contractId);


    		// adding to the html
    		for (let i = 0; i < campArray.length; i++) {

	    		const campButtons = $('<button>');

	    		campButtons.addClass('camp-button');

	    		campButtons.attr('data-camp', campArray[i]);

	    		campButtons.attr('data-long', longArray[i]);
	    		
	    		campButtons.attr('data-lat', latArray[i]);

	    		campButtons.attr('data-facility', facilityArray[i]);

	    		campButtons.attr('data-contract', contractArray[i]);
	    		

	    		campButtons.text(campArray[i]);

	    			

	    		campName.append(campButtons);

	    	}

	    })

    })

})

	    		


			$(document).on('click', '.camp-button', function(){ 				

						// map

			    		mapboxgl.accessToken = 'pk.eyJ1IjoiYnJvd25jb2F0IiwiYSI6ImNqY2Nvb3NibjBpbWIyeW50NHZ6cGZmODUifQ.tAp8DhP9budvHomRqyv0lg';
						var map = new mapboxgl.Map({
						container: 'map',
						style: 'mapbox://styles/mapbox/outdoors-v10',
						center: [$(this).attr('data-long'), $(this).attr('data-lat')],
						zoom: 6
						});

						let markerImg = new Image();
						markerImg.src = 'assets/images/marker.png';
						markerImg.style.height = '30px';
			    		markerImg.style.width = '30px';

						let marker = new mapboxgl.Marker(markerImg)
						.setLngLat([$(this).attr('data-long'), $(this).attr('data-lat')])
						.addTo(map)						

						// map plus minus button
						map.addControl(new mapboxgl.NavigationControl());

						// map popup message
						var markerHeight = 50, markerRadius = 10, linearOffset = 25;
						var popupOffsets = {
						 'top': [0, 0],
						 'top-left': [0,0],
						 'top-right': [0,0],
						 'bottom': [0, -markerHeight],
						 'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
						 'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
						 'left': [markerRadius, (markerHeight - markerRadius) * -1],
						 'right': [-markerRadius, (markerHeight - markerRadius) * -1]
						 };
						var popup = new mapboxgl.Popup({offset:popupOffsets})
						  .setLngLat([$(this).attr('data-long'), $(this).attr('data-lat')])
						  .setHTML($(this).attr('data-camp'))
						  .addTo(map);

						
						// end map

						// weather
						const queryURLWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + $(this).attr('data-lat') + "&lon=" + $(this).attr('data-long') + 
			    		"&APPID=187fb301a3565644c00135af35769e08";
			    		

				    	$.ajax({
				    		url: queryURLWeather,
				    		method: "GET"
				    	}).done(function(weatherResponse) {

				    		// console.log(weatherResponse);

				    		let tempFar = weatherResponse.list[0].main.temp * 9/5 - 459.67;
				    		let tempFarRounded = Math.floor(tempFar);

				    		const weatherMain = $('#weather-temp');
				    		weatherMain.text('Temperature: ' + tempFarRounded + ' degrees F');

				    		const weatherDescription = $('#weather-description');
				    		weatherDescription.text(weatherResponse.list[0].weather[0].description);
				    	})

				    	
				    	// end weather	

				    	

				    	const queryURL = "http://api.amp.active.com/camping/campground/details?contractCode=" + $(this).attr('data-contract') + "&parkId=" + $(this).attr('data-facility') + "&api_key=8av4h3s7ecqejs3gbhcj6q6h";
						const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';


					    $.ajax({
					    	url: proxyUrl + queryURL,
					    	method: "GET",
					    	headers:{
					    		authorization: 'Bearer ' + '8av4h3s7ecqejs3gbhcj6q6h'

					    	}
					    }).done(response => {
					    	
					    	window.res = response;
					    		console.log(response);

					    		let detail = $(res).find('detailDescription').each(function(r) {
					    			console.log($(this).attr('description'));
					    			console.log($(this).attr('drivingDirection'));



					    			let detailTwo = $(this).attr('description');
					    			let campDetail = $('#camp-detail');
					    			campDetail.empty();
					    			campDetail.append(detailTwo);

					    		})

					    	})

				
				})

			

		

    
 		
  
  
	
	//save for later allows to show allows to clear the page without changing files
	$('#home').on('click', function(){
		$('#wholeContainer').show();
	})



	
// closing tag for document ready
});