
	//creating object to hold non-profits info
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

