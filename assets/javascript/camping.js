$(".contentContainer").css("min-height", $(window).height());
$(".arrow").hide();
$(".arrow2").hide();
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

    console.log(nonProfits);
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
        $('.arrow2').show();
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
                        "&maxDistance=10&maxResults=3&key=200209593-2d1e8288276f62fa07701a4f0905a28f"
                     $.ajax({
                        url: queryURL,
                        method: "GET",
                        }).done(response => {
                          console.log(response);
                            for (let i = 0; i < response.trails.length; i++){
                        console.log(response.trails[i]);
                        const url = response.trails[i].url;

                        $('#slide'+ (i + 1)).attr("src", url);
                            }
                            $('.carousel').carousel({interval: 1000})
                        
                        })
                    // const site = "https://www.greatoutdoorvacations.com/?q="+ campsite + "&" + lat + "&" + long;
                    // window.open(site);
                    });
                })
            })
        }

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

