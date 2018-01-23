$(document).ready(function() {

						// map on load

						mapboxgl.accessToken = 'pk.eyJ1IjoiYnJvd25jb2F0IiwiYSI6ImNqY2Nvb3NibjBpbWIyeW50NHZ6cGZmODUifQ.tAp8DhP9budvHomRqyv0lg';
						var map = new mapboxgl.Map({
						container: 'map',
						style: 'mapbox://styles/mapbox/outdoors-v10',
						center: [-103.579102, 48.365374],
						zoom: 2
						});


						// adds hillshading to the map
						  map.on('load', function () {
						    map.addSource('dem', {
						        "type": "raster-dem",
						        "url": "mapbox://mapbox.terrain-rgb"
						    });
						    map.addLayer({
						        "id": "hillshading",
						        "source": "dem",
						        "type": "hillshade"
						    }, 'waterway-river-canal-shadow');
						});

						  // finds the users location
						map.addControl(new mapboxgl.GeolocateControl({
						    positionOptions: {
						        enableHighAccuracy: true
						    },
						    trackUserLocation: true
						}));
	
						// adds directions section
						map.addControl(new MapboxDirections({
						    accessToken: mapboxgl.accessToken
						}), 'top-left');

						// scrolls to the location of your mouse on the map
						if (map.mouseenter) {
						  window.onscroll = function() {
						    var chapterNames = Object.keys(chapters);
						    for (var i = 0; i < chapterNames.length; i++) {
						        var chapterName = chapterNames[i];
						        if (isElementOnScreen(chapterName)) {
						            setActiveChapter(chapterName);
						            break;
						        }
						    }

						}
						
						};

						// map plus minus button
						map.addControl(new mapboxgl.NavigationControl());

					// end map  

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
    	// console.log(response);

    		let name = $(res).find('result').each(function(r) { 

    		let nameTwo = $(this).attr('facilityName');

    		let lat = $(this).attr('latitude');
    		// console.log(lat);
    		let long = $(this).attr('longitude');
    		// console.log(long);
    		const imgURL = 'http://www.reserveamerica.com/' + $(this).attr('faciltyPhoto');
    		    		
    		let facilityId = $(this).attr('facilityID');
    		
    		let contractId = $(this).attr('contractID');

    		let campArray = [];
    		let longArray = [];
    		let latArray = [];
    		let facilityArray = [];
    		let contractArray = [];
    		let photoArray = [];

    		longArray.push(long);
    		latArray.push(lat);
    		campArray.push(nameTwo);
    		facilityArray.push(facilityId);
    		contractArray.push(contractId);
    		photoArray.push(imgURL);
    		// console.log(photoArray);

    		// adding camp buttons to the html when the state is clicked
    		for (let i = 0; i < campArray.length; i++) {

	    		const campButtons = $('<button>');

	    		campButtons.addClass('camp-button');

	    		campButtons.attr('data-camp', campArray[i]);

	    		campButtons.attr('data-long', longArray[i]);
	    		
	    		campButtons.attr('data-lat', latArray[i]);

	    		campButtons.attr('data-facility', facilityArray[i]);

	    		campButtons.attr('data-contract', contractArray[i]);

	    		campButtons.attr('data-photo', photoArray[i]);
	    		
	    		campButtons.text(campArray[i]);

	    		campName.append(campButtons);

	    	}

	    })

    })

})

			$(document).on('click', '.camp-button', function(){ 

						// map when you select a campsite

						// marker image and adding the marker to the page
						let campPhoto = $(this).attr('data-photo')
						let markerImg = new Image();
						markerImg.src = campPhoto;
						markerImg.style.height = '50px';
			    		markerImg.style.width = '50px';
			    		markerImg.style.borderRadius = '25px';

						let marker = new mapboxgl.Marker(markerImg)
						.setLngLat([$(this).attr('data-long'), $(this).attr('data-lat')])
						.addTo(map)								

						// flys to the location of the campsite
						map.flyTo({
						        center: [$(this).attr('data-long'), $(this).attr('data-lat')],
						        zoom: 11
						    })

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

					// trail api
					const trailsqueryURL = "https://www.hikingproject.com/data/get-trails?lat=" + $(this).attr('data-lat') + "&lon=" + $(this).attr('data-long') + 
				    "&maxDistance=5&maxResults=5&key=200209593-2d1e8288276f62fa07701a4f0905a28f"

				     $.ajax({
				        url: trailsqueryURL,
				        method: "GET",
				    	}).done(response => {
				    		for (let i = 0; i < response.trails.length; i++){
				    	let trailLat = response.trails[i].latitude;
				    	let trailLong = response.trails[i].longitude;
				    	let trailName = response.trails[i].name;
				    	const url = response.trails[i].url;
				    	const iframe = $("<iframe height='400px' width='400px'>");
				    	const link = $(iframe).attr('src', url);
				    	$('.trailsDiv').append(link);
   	
   							// adds trail locations to the map
					    	let trailImg = new Image('id="trailDot');
							trailImg.src = 'assets/images/dot.png';
							trailImg.style.height = '20px';
				    		trailImg.style.width = '20px';
				    		trailImg.style.borderRadius = '25px';	

							let marker = new mapboxgl.Marker(trailImg)
							.setLngLat([trailLong, trailLat])
							.addTo(map)
							
							var markerHeight = 10, markerRadius = 10, linearOffset = 25;
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
							  .setLngLat([trailLong, trailLat])
							  .setHTML('Trail: ' + trailName)
							  .addTo(map);

						// end map
						// end trail api

				    }    

				})

						// weather api
						const queryURLWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + $(this).attr('data-lat') + "&lon=" + $(this).attr('data-long') + 
			    		"&APPID=187fb301a3565644c00135af35769e08";
			    		
				    	$.ajax({
				    		url: queryURLWeather,
				    		method: "GET"
				    	}).done(function(weatherResponse) {

				    		// console.log(weatherResponse);

				    		const weatherDiv = $("<div class='weather'>");



				    			// day 1 forecast
					    		const weatherDate0 = $('<p>').text('Date: ' + weatherResponse.list[0].dt_txt);
					    		weatherDiv.append(weatherDate0);

					    		let tempFar0 = weatherResponse.list[0].main.temp * 9/5 - 459.67;
					    		let tempFarRounded0 = Math.floor(tempFar0);

					    		const weatherMain0 = $('<p>').text('Temperature: ' + tempFarRounded0 + ' degrees F');
					    		weatherDiv.append(weatherMain0);

					    		const weatherDescription0 = $('<p>').text(weatherResponse.list[0].weather[0].description);
					    		weatherDiv.append(weatherDescription0);

					    		// day 2 forecast
					    		weatherDate8 = $('<p>').text('Date: ' + weatherResponse.list[8].dt_txt);
					    		weatherDiv.append(weatherDate8);

					    		let tempFar8 = weatherResponse.list[8].main.temp * 9/5 - 459.67;
					    		let tempFarRounded8 = Math.floor(tempFar8);

					    		const weatherMain8 = $('<p>').text('Temperature: ' + tempFarRounded8 + ' degrees F');
					    		weatherDiv.append(weatherMain8);

					    		const weatherDescription8 = $('<p>').text(weatherResponse.list[8].weather[0].description);
					    		weatherDiv.append(weatherDescription8);

					    		// day 3 forecast
					    		const weatherDate16 = $('<p>').text('Date: ' + weatherResponse.list[16].dt_txt)
					    		weatherDiv.append(weatherDate16);

					    		let tempFar16 = weatherResponse.list[16].main.temp * 9/5 - 459.67;
					    		let tempFarRounded16 = Math.floor(tempFar16);

					    		const weatherMain16 = $('<p>').text('Temperature: ' + tempFarRounded16 + ' degrees F');
					    		weatherDiv.append(weatherMain16);

					    		const weatherDescription16 = $('<p>').text(weatherResponse.list[16].weather[0].description);
					    		weatherDiv.append(weatherDescription16);

					    		// day 4 forecast
					    		const weatherDate24 = $('<p>').text('Date: ' + weatherResponse.list[24].dt_txt)
					    		weatherDiv.append(weatherDate24);

					    		let tempFar24 = weatherResponse.list[24].main.temp * 9/5 - 459.67;
					    		let tempFarRounded24 = Math.floor(tempFar24);

					    		const weatherMain24 = $('<p>').text('Temperature: ' + tempFarRounded24 + ' degrees F');
					    		weatherDiv.append(weatherMain24);

					    		const weatherDescription24 = $('<p>').text(weatherResponse.list[24].weather[0].description);
					    		weatherDiv.append(weatherDescription24);

					    		// day 5 forecast
					    		const weatherDate32 = $('<p>').text('Date: ' + weatherResponse.list[32].dt_txt)
					    		weatherDiv.append(weatherDate32);

					    		let tempFar32 = weatherResponse.list[32].main.temp * 9/5 - 459.67;
					    		let tempFarRounded32 = Math.floor(tempFar32);
					    		
					    		const weatherMain32 = $('<p>').text('Temperature: ' + tempFarRounded32 + ' degrees F');
					    		weatherDiv.append(weatherMain32);

					    		const weatherDescription32 = $('<p>').text(weatherResponse.list[32].weather[0].description);
					    		weatherDiv.append(weatherDescription32);

					    		$('#weather-view').empty();
					    		$('#weather-view').prepend(weatherDiv);


				    	})
 	
				    	// end weather api

				    	// camp detail api
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
					    			
					    			const detailDiv = $("<div class='camp-details'>");

					    				const facility = $('<p>').text($(this).attr('facility'));
					    				detailDiv.append(facility);

					    					let detailAddress = $(res).find('address').each(function(r) {

					    						const city = $('<p>').text($(this).attr('city'));
					    						detailDiv.append(city);

					    						const state = $('<p>').text($(this).attr('state'));
					    						detailDiv.append(state);

							    				const address = $('<p>').text($(this).attr('streetAddress'));
							    				detailDiv.append(address);

							    				const zipCode = $('<p>').text($(this).attr('zip'));
							    				detailDiv.append(zipCode);

							    			})

						    			const detailTwo = $('<p>').text($(this).attr('description'));
						    			detailDiv.append(detailTwo);

						    			const recreation = $('<p>').text($(this).attr('recreationDescription'));
						    			detailDiv.append(recreation);

						    			const important = $('<p>').text($(this).attr('importantInformation'));
						    			detailDiv.append(important);

						    			const reservation = $('<a>').text('Make a Reservation');
						    			reservation.attr('href', $(this).attr('fullReservationUrl'));
						    			window.open(reservation, '_blank');
						    			detailDiv.append(reservation);
						    			console.log(reservation);

						    			const alert = $('<p>').text($(this).attr('alert'));
						    			detailDiv.append(alert);

						    			$('#detail-view').empty();
						    			$('#detail-view').prepend(detailDiv);



					    		})

					    	})			
				})
			
	//save for later allows to show allows to clear the page without changing files
	$('#home').on('click', function(){
		$('#wholeContainer').show();
	})



	
// closing tag for document ready
});