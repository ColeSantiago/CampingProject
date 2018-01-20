$(".contentContainer").css("min-height", $(window).height());
$(".arrow").hide();
$(document).ready(function() {
    let longArray = [];
    let latArray = [];
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
    	stateDiv();
    	stateName();
    });
    //with the value abbr we can then access the api when the user clicks
    //without any input and we return the response
    function stateName(){$(".stateName").on('click', function(){
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
    		console.log(response);
            let name = $(response).find('result').each(function(r) { 
	            let nameTwo = $(this).attr('facilityName');
	            let parkId = $(this).attr('contractID');
	            let lat = $(this).attr('latitude');
	            let long = $(this).attr('longitude');
	            const campButtons = $('<button class="camp-button"><a></a></button>');
	            let campArray = [];
	            // longArray.push(long);
	            // latArray.push(lat);
	            campArray.push(nameTwo);
	            // console.log(campArray);
	        

	            $('#container').append($("<div id='buttonContainer'>"));
	            // adding to the html
	            let newLine = $('<br>');
	            for (let i = 0; i < campArray.length; i++) {
	            	// console.log(campArray.length);
	                // campButtons.attr('href', site);
	                campButtons.attr('data-camp', campArray[i]);
	                campButtons.val(abbr);
	                campButtons.attr('data-lat', lat);
	                console.log(lat);
	                campButtons.attr('data-long', long);
	                console.log(long);
	                campButtons.text(campArray[i]);
	                $('#buttonContainer').append(campButtons);
	                }
	             })

	            $('.camp-button').on('click', function(){
	            	let campsite = $(this).text();
	            	let lat = $(this).attr('data-lat');
	            	let long = $(this).attr('data-long');
	            	const queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + 
				    	"&maxDistance=5&maxResults=1&key=200209593-2d1e8288276f62fa07701a4f0905a28f"
				     $.ajax({
				        url: queryURL,
				        method: "GET",
				    	}).done(response => {
				    		for (let i = 0; i < response.trails.length; i++){
				    	console.log(response.trails[i]);
				    	const url = response.trails[i].url;
				    	const iframe = $("<iframe height='600px' width='1100px'>");
				    	const link = $(iframe).attr('src', url);
				    	$('.trailsDiv').append(link);
				    }
				    	
						})
	            	// const site = "https://www.greatoutdoorvacations.com/?q="+ campsite + "&" + lat + "&" + long;
	            	// window.open(site);
	            	});
				})
	        })
    }
    //save for later allows to show allows to clear the page without changing files
    $('#home').on('click', function(){
        $('#wholeContainer').show();
    })

    
    	//recycling
    
    
    $( "#draggable" ).draggable({ revert: "invalid" });
 
    $( "#droppable" ).droppable({
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "YES" );
      }
    });
  
// closing tag for document ready
})