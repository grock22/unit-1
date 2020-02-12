//initialize function called when the script loads
function initialize(){
	cities();
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");
	
	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");
	
	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
	// add city size data as well as event functions specified below to table
    addColumns(cityPop);
    addEvents();
};
// add column of city size to parameter cityPop function
function addColumns(cityPop){
    // for each row in new column...
    $('tr').each(function(i){
		// if first row, append header title City Size
    	if (i == 0){

    		$(this).append('<th>City Size</th>');
		// else, citySize variable will be appended to row
    	} else {

    		var citySize;
			// if population value for city is less than 100000, small city
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
			// if population value for city is less than 500000, medium city
    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';
			// if population value not any of the above, must be large city
    		} else {
    			citySize = 'Large';
    		};
			// append citySize value to row and put in new column City Size
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};
// Event function that will add effects when clicking or mousing over table
function addEvents(){
	// events to be done when cursor is over mydiv (table)
	$('#mydiv').mouseover(function(){
		// set color variable equal to rgb values
		var color = "rgb(";
		// for each value in rgb, (red value, green value, blue value), which is 3 variables
		for (var i=0; i<3; i++){
			// assign random value as whole number from 0 to 255
			var random = Math.round(Math.random() * 255);
			// add random value to color variable to generate random colors
			color += random;
			// if on red and green variables, add comma to get next variable
			if (i<2){
				color += ",";
			// if on blue stop and repeat
			} else {
				color += ")";
		};
		// assign css style 'color' the color variable (or random rgb value)
		$(this).css('color', color);
	};
	//when you click on table, pop up will alert user "Hey, you clicked me!"
	function clickme(){
		alert('Hey, you clicked me!');
	};
	//calls clickme function as alert string for 'click' method
	$('table').on('click', clickme);
		});
};

function debugAjax(){
	// defining a variable for the geojson data
	var mydata;
	
	//jQuery ajax method for json data, calling data from folder
	$.ajax("data/MegaCities.geojson", {
		//define data type, success parameter is a callback, which is an anomynous function that calls another function
		dataType: "json",
		success: function(response){
			// my data (geojson) is set as response parameter
			mydata = response;
			//append data strings to the table 
			$(mydiv).append(JSON.stringify(mydata));
			
		}
	});
	//make a break in the page, then put GeoJSON data: text in
	$(mydiv).append('<br>GeoJSON data: <br>');
};
//callback function
function debugCallback(response){};


//call the initialize function when the document has loaded
$(document).ready(initialize);
//calls debugAjax function when document loaded
$(document).ready(debugAjax);
