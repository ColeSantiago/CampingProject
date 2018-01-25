$(document).ready(function() {

	//Modal Image Code

	// Get the modal
	let modal = document.getElementById('myModal');
	let modalImg = document.getElementById("img01");
	let captionText = document.getElementById("caption");

//Image Objects
	const tipCards = {
	  'backpack': {
	    longImage: 'assets/images/camp-prep-1-long.jpg',
	  },
	  'bear': {
	    longImage: 'assets/images/camp-prep-2-long.png',
	  },
	  'mosquito': {
	  	longImage: 'assets/images/camp-prep-3-long.jpg',
	  },
	  'hypothermia': {
	  	longImage: 'assets/images/camp-prep-4-long.jpg',
	  },
	  'spiderbites': {
	  	longImage: 'assets/images/camp-prep-5-long.jpg',
	  },
	  'campfire': {
	  	longImage: 'assets/images/camp-prep-6-long.jpg',
	  },
	  'first-aid': {
	  	longImage: 'assets/images/camp-prep-7-long.jpg',
	  },
	  'shelter': {
	  	longImage: 'assets/images/camp-prep-8-long.jpg',
	  },
	  'tent': {
	  	longImage: 'assets/images/camp-prep-9-long.png',
	  },
	  'trapping': {
	  	longImage: 'assets/images/camp-prep-10-long.jpg',
	  },
	};

// Opens modal and calls on object's longImage property.
	$(".tip-card").on("click", function() {
	  const id = document.getElementById(this.id);
	  let tipCardsItems = tipCards[this.id];
	// Console logging object info
	  console.log(id);
	  console.log(tipCardsItems);

	  modal.style.display = "block";
	  const modalImage = document.querySelector('.w3s-modal-content');
	  modalImage.src = tipCards[this.id].longImage;
	  captionText.innerHTML = this.alt;

	  });

	// Get the <span> element that closes the modal
	let span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() { 
	  modal.style.display = "none";
	}
	// end modal

		$(".arrow").hide();

		// grab the initial top offset of the navigation 
        var stickyNavTop = $('#menu').offset().top;
               
        // our function that decides weather the navigation bar should have "fixed" css position or not.
        var stickyNav = function(){
            var scrollTop = $(window).scrollTop(); // our current vertical position from the top
                     
            // if we've scrolled more than the navigation, change its position to fixed to stick to top,
            // otherwise change it back to relative
            if (scrollTop > stickyNavTop) { 
                $('#menu').addClass('stickynavbar');
            } 
            else {
                $('#menu').removeClass('stickynavbar'); 
            }
        };

            stickyNav();
            // and run it again every time you scroll
            $(window).scroll(function() {
                stickyNav();
            });

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

	 const nonProfits = [
        {"Name": "Wildlife Conservation Network", 
         "Description":"This eco-friendly non-profit organization protects endangered species and preserves their natural habitats.  WCN partners with independent, community-based conservationists around the world and gives them the capital and tools they need to develop solutions for human-wildlife coexistence.  100% of any donation can be designated to the conservation of a specific species if requested.", 
         "Poster": "https://animaliacollective.com/wp-content/uploads/2017/03/wcn_partner-logo.png", 
         "pageLink":"https://wildnet.org/"
        },
        {"Name":"The Nature Conservancy",
         "Description":"From climate change and rainforests to anything in between, this eco-friendly, non-profit organization is committed to taking on tough issues facing conservation efforts today. To date, they have protected more than 119 million acres of land and 5,000 miles of rivers worldwide, making it one of the largest eco-oriented charities in the world.",
         "Poster":"https://www.nature.org/cs/groups/webasset/documents/webasset/tnc-share-logo.gif",
         "pageLink":"https://www.nature.org/?redirect=https-301"
        },
        {"Name":"Environmental Defense Fund",
         "Description":"This eco-friendly non-profit takes on most urgent environmental threats to the climate, ecosystems, people’s health, and more and then fights them by combining science, economics, and law to find practical and lasting solutions.  They scored high on Charity Finder and uses 79% of their funds for program expenses.",
         "Poster":"http://www.bkv.com/assets/clients/environmental_defense_fund-86dd956352770392146bb25ddf8f1916f0ec98a48c14d76648bff47b92214be2.png",
         "pageLink":"https://www.edf.org/"
        },
        {"Name":"Greenpeace",
         "Description":"This world renowned eco-friendly organization uses lobbying and research to reach its environmental protection and conservation goals. From protecting oceans, forests, and wildlife to working towards no new nukes, no issue is too tough for Greenpeace to go after.",
         "Poster":"https://financialtribune.com/sites/default/files/field/image/13_Greenpeace.jpg",
         "pageLink":"http://www.greenpeace.org/usa/"
        },
        {"Name":"National Geographic Society",
         "Description":"The key to this eco-friendly organization’s conservation approach is to show the planet’s natural beauty so people will appreciate it. In addition to conservation, National Geographic supports exploration and scientific research through grant programs and public projects.",
         "Poster":"https://impactinvestingconferences.com/wp-content/uploads/2017/06/NGS.png",
         "pageLink":"https://donate.nationalgeographic.org/17-ge-adw?gclid=Cj0KCQiA-ebSBRC8ARIsAGuxJIpoDl4PXsTKPj_FiOKOfsPA5aBLFrGyoRORfUX09i9Les4pDng7z9AaAiTeEALw_wcB"
        }
    ]

    //for loop creating divs and adding information from nonProfits array into each div
    for (let i = 0; i < nonProfits.length; i++) {
        
        //main container for each non-profit
        const nonProfitContainer = $('<div>');
        nonProfitContainer.addClass('non-profit-container');

        //div containing name of each non-profit
        const nameDiv = $('<div>');
        nameDiv.addClass('charity-name');
        nameDiv.text(nonProfits[i].Name);

        //div containing images of each non-profit's logo
        const posterDiv = $('<img>');
        posterDiv.addClass('charity-poster');
        posterDiv.attr("src", nonProfits[i].Poster);

        //div containing each non-profits descriptions/mission statements
        const descriptionDiv = $('<div>');
        descriptionDiv.addClass('charity-description');
        descriptionDiv.text(nonProfits[i].Description);

        //div containing a tags linking users to each non-profits' pages
        const donateDiv = $('<div>');
        const donateBtn = $('<a>' + "Learn More & Donate!" + '</a>');
        $(donateDiv).html("<p>");
        donateBtn.attr("href", nonProfits[i].pageLink);
        donateBtn.attr("target", "_blank");
        donateBtn.attr("data-value", "Learn More & Donate!");
        donateDiv.addClass("donate-button");
        $(donateDiv).append(donateBtn);

        //appending divs to main container
        $(nonProfitContainer).append(nameDiv);
        $(nonProfitContainer).append(posterDiv);
        $(nonProfitContainer).append(descriptionDiv);
        $(nonProfitContainer).append(donateDiv);

        $('#donate-hold').append(nonProfitContainer);

    };

    $("#donate-link").on("click", function() {
        $("#mainBodyDiv").hide();
        $("#container").hide();
        $("#prep").hide();
    })


	//looping through and displaying each state in the above array as well as
	//giving it the value of abbr
 function stateDiv(){
    for (let i = 0; i < stateArr.length; i++){
        let newDiv = $('<div class="stateDiv">');
        let abbr = stateArr[i].abbr;
        // let arrowDiv = $('<div>');
        newDiv.html('<button value="'+stateArr[i].abbr+'" class="stateName">' + stateArr[i].state + '</button>');
        // arrowDiv.html("<span class='glyphicon glyphicon-arrow-left'>")
        $("#container").append(newDiv);
        // $(newDiv).prepend(arrowDiv);
     }
  }
    stateDiv();
    stateName();
     $('.arrow').on('click',function(){
        $('.arrow').hide();
        $('#container').empty();
        $('#carouselContainer').css('display', 'none');
        stateDiv();
        stateName();
    });
    //with the value abbr we can then access the api when the user clicks
    //without any input and we return the response
    function stateName(){$(".stateName").on('click', function(){

    	$('#buttonContainer').empty();

        $('.arrow').fadeIn('slow');
        let abbr = $(this).val();

        const clickedElement = this;
        $('.stateName').each(function() {
        if(this !== clickedElement) {
        $(this).hide();    
        }});
        console.log(abbr);

        $(this).animate({
            opacity: 1,
            height: "50px",
        },1000,"linear");

        $('.stateDiv').css({"display":"inline", "margin":"0px"});

        // $("#container").css("overflow", "hidden");

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
	    		const imgURL = 'http://www.reserveamerica.com/' + $(this).attr('faciltyPhoto');
	    		    		
	    		let facilityId = $(this).attr('facilityID');
	    		
	    		let contractId = $(this).attr('contractID');

	    		let campArray = [];
	    		let longArray = [];
	    		let latArray = [];
	    		let facilityArray = [];
	    		let contractArray = [];
	    		let photoArray = [];

	    		const campButtons = $('<button class="camp-button"><a></a></button>');

	    		longArray.push(long);
	    		latArray.push(lat);
	    		campArray.push(nameTwo);
	    		facilityArray.push(facilityId);
	    		contractArray.push(contractId);
	    		photoArray.push(imgURL);

    		// adding camp buttons to the html when the state is clicked
    		$('#container').append($("<div id='buttonContainer'>"));
                // adding to the html
                let newLine = $('<br>');
                for (let i = 0; i < campArray.length; i++) {
                    // console.log(campArray.length);
                    // campButtons.attr('href', site);
                    campButtons.attr('data-camp', campArray[i]);
                    campButtons.val(abbr);
                    campButtons.attr('data-lat', lat);
                    // console.log(lat);
                    campButtons.attr('data-long', long);
                    // console.log(long);
                    campButtons.attr('data-facility', facilityArray[i]);
                    campButtons.attr('data-contract', contractArray[i]);
                    campButtons.text(campArray[i]);
                    campButtons.attr('data-photo', photoArray[i]);

                    $('#buttonContainer').append(campButtons);
                    }
                 })
	    })

    })

}

			$(document).on('click', '.camp-button', function(){ 

				$('.camp-button').hide();
				$('#carouselContainer').css('display', 'block');

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

						    map.on('click', campPhoto, function (e) {
        						new mapboxgl.Popup()
            					.setLngLat([$(this).attr('data-long'), $(this).attr('data-lat')])
            					.setHTML($(this).attr('data-camp'))
            					.addTo(map);
            					console.log('ive been clicked')
   							 });

					// end map

					// trail api
					const trailsqueryURL = "https://www.hikingproject.com/data/get-trails?lat=" + $(this).attr('data-lat') + "&lon=" + $(this).attr('data-long') + 
				    "&maxDistance=10&maxResults=5&key=200209593-2d1e8288276f62fa07701a4f0905a28f"

				     $.ajax({
				        url: trailsqueryURL,
				        method: "GET",
				    	}).done(response => {
				    		for (let i = 0; i < response.trails.length; i++){
                        		const url = response.trails[i].url;

                        		$('#slide'+ (i + 1)).attr("src", url);
                            }
                            
                            // $('.carousel').carousel({interval: 1000})
                
				    		for (let i = 0; i < response.trails.length; i++){
						    	let trailLat = response.trails[i].latitude;
						    	let trailLong = response.trails[i].longitude;
						    	let trailName = response.trails[i].name;
   	
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

					    		// // day 2 forecast
					    		// weatherDate8 = $('<p>').text('Date: ' + weatherResponse.list[8].dt_txt);
					    		// weatherDiv.append(weatherDate8);

					    		// let tempFar8 = weatherResponse.list[8].main.temp * 9/5 - 459.67;
					    		// let tempFarRounded8 = Math.floor(tempFar8);

					    		// const weatherMain8 = $('<p>').text('Temperature: ' + tempFarRounded8 + ' degrees F');
					    		// weatherDiv.append(weatherMain8);

					    		// const weatherDescription8 = $('<p>').text(weatherResponse.list[8].weather[0].description);
					    		// weatherDiv.append(weatherDescription8);

					    		// // day 3 forecast
					    		// const weatherDate16 = $('<p>').text('Date: ' + weatherResponse.list[16].dt_txt)
					    		// weatherDiv.append(weatherDate16);

					    		// let tempFar16 = weatherResponse.list[16].main.temp * 9/5 - 459.67;
					    		// let tempFarRounded16 = Math.floor(tempFar16);

					    		// const weatherMain16 = $('<p>').text('Temperature: ' + tempFarRounded16 + ' degrees F');
					    		// weatherDiv.append(weatherMain16);

					    		// const weatherDescription16 = $('<p>').text(weatherResponse.list[16].weather[0].description);
					    		// weatherDiv.append(weatherDescription16);

					    		// // day 4 forecast
					    		// const weatherDate24 = $('<p>').text('Date: ' + weatherResponse.list[24].dt_txt)
					    		// weatherDiv.append(weatherDate24);

					    		// let tempFar24 = weatherResponse.list[24].main.temp * 9/5 - 459.67;
					    		// let tempFarRounded24 = Math.floor(tempFar24);

					    		// const weatherMain24 = $('<p>').text('Temperature: ' + tempFarRounded24 + ' degrees F');
					    		// weatherDiv.append(weatherMain24);

					    		// const weatherDescription24 = $('<p>').text(weatherResponse.list[24].weather[0].description);
					    		// weatherDiv.append(weatherDescription24);

					    		// // day 5 forecast
					    		// const weatherDate32 = $('<p>').text('Date: ' + weatherResponse.list[32].dt_txt)
					    		// weatherDiv.append(weatherDate32);

					    		// let tempFar32 = weatherResponse.list[32].main.temp * 9/5 - 459.67;
					    		// let tempFarRounded32 = Math.floor(tempFar32);
					    		
					    		// const weatherMain32 = $('<p>').text('Temperature: ' + tempFarRounded32 + ' degrees F');
					    		// weatherDiv.append(weatherMain32);

					    		// const weatherDescription32 = $('<p>').text(weatherResponse.list[32].weather[0].description);
					    		// weatherDiv.append(weatherDescription32);

					    		$('#weather-view').empty();
					    		$('#buttonContainer').prepend(weatherDiv);

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

					    						const city = $('<p class="city">').text($(this).attr('city'));
                                                detailDiv.append(city);

                                                const address = $('<p class="street">').text($(this).attr('streetAddress'));
                                                detailDiv.append(address);

                                                const zipCode = $('<p class="zip">').text($(this).attr('zip'));
                                                detailDiv.append(zipCode);

                                            })

                                        const detailTwo = $('<p class="main-info">').text($(this).attr('description'));
                                        detailDiv.append(detailTwo);

                                        const recreation = $('<p class="rect-info">').text($(this).attr('recreationDescription'));
                                        detailDiv.append(recreation);

                                        const important = $('<p class="important-info">').text($(this).attr('importantInformation'));
                                        detailDiv.append(important);

						    			const reservation = $('<a>').text('Make a Reservation');
						    			reservation.attr('href', $(this).attr('fullReservationUrl'));
						    			reservation.attr('target', '_blank');
						    			detailDiv.append(reservation);
						    			console.log(reservation);

						    			const alert = $('<p>').text($(this).attr('alert'));
						    			detailDiv.append(alert);

						    			$('#detail-view').empty();
						    			$('#buttonContainer').append(detailDiv);

					    		})

					    	})			
				})
			
	//save for later allows to show allows to clear the page without changing files
	$('#home').on('click', function(){
		$('#wholeContainer').show();
	})


// closing tag for document ready
});

