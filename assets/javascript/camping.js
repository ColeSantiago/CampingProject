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

	const queryURL = "http://api.amp.active.com/camping/campgrounds/?pstate=" + abbr
	+ "&api_key=ef9azejauz44cthn4n3hdfqb" 

	$.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {

      console.log(response);

    });

	})

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