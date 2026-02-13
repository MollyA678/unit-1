// This is the main JavaScript file
// There needs to be a function for the cityPop variable, and it should be called first thing in the initialization after everything loads
function initialize(){
	cities()
};

function cities(){
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
// Have to create the table element first
var table = document.createElement("table");
// Then add a header row
var headerRow = document.createElement("tr");
table.appendChild(headerRow);
// Create the column header labels
headerRow.insertAdjacentHTML('beforeend', '<th>City</th><th>Population</th>');
// Loop adding rows and putting the city data in the cells
cityPop.forEach(function(cityObject){
	var rowHtml = '<tr><td>' + cityObject.city + '</td><td>' + cityObject.population + '</td></tr>';
	table.insertAdjacentHTML('beforeend', rowHtml);
});
// Put the table in the div thats an id
document.querySelector("#myDiv").appendChild(table);

// Call the functions below for adding columns and events
addColumns(cityPop)
addEvents()
};


function addColumns(cityPop){
    
    document.querySelectorAll("tr").forEach(function(row, i){

    	if (i == 0){
        // The syntax for 'insertAdjacentHTML' was mispelled. Corrected.
    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			// 'citysize' variable was not recognized due to lack of uniform camel case. Changed to 'citySize'.
				citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
            // The syntax for 'insertAdjacentHTML' was mispelled. The start of the <td> tag was not closed. A position arguement was also needed, so I added 'beforeend' to add these cells at the end of the existing rows. I corrected all this and enclosed the arguement in parentheses.
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
    	};
    });
};

function addEvents(){

	// The "table" selection should be stored in the variable created above to make things easier
    var table = document.querySelector("table");
    // Can be the variable table instead of the query selector again
	table.addEventListener("mouseover", function(){
		
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);
            // The random variable was written out as a string, and was therefore not being used. Corrected.
			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
		};
		// Closing bracket added for the for Loop started on Line 53
	    };
		// Can be the variable table instead of the query selector again
		table.style.color = color;
	});

	function clickme(){

		alert('Hey, you clicked me!');
	};
    // Can be the variable table instead of the query selector again
	table.addEventListener("click", clickme)
};

// The initialize neeeds to be called at the end here
document.addEventListener('DOMContentLoaded', initialize);

//Initializing functions, the second of which will be held up by the .then functions added later
function initialize(){
	loadData();
	debugAjax();
};

//Creating a function to load the GeoJSON data to the console. The function is called in the initialize function so that it runs after everything loads.
function loadData(){
    fetch("data/MegaCities.geojson")
		.then(function(response){
			return response.json();
		})
		.then(function(myData){
			console.log(myData);
		})
}
// Since 'response' parameter was not consistent with the 'myData' variable used later in this function, I simply switched the parameter to 'myData'
function debugCallback(myData){
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(myData))
};

function debugAjax(){
	// Deleting the var myData declaration here, since it became unecessary with the addition of .then(debugCallback) below.
	// The .geojson file was created from the csv file using geojson.io, which are both now stored in the data folder.
	fetch("data/MegaCities.geojson")
		.then(function(response){
			// The response needed to be converted to json format. Corrected.
			return response.json();
		})
		    // The extra document.querySelector was unecessary and confusing, along with trying to call the debugCallback function with response. Instead, I'm just telling it to start the debugCallback after. 
			.then(debugCallback);
	};
// Deleted the document.querySelector at the end here because it would happen before the data was loaded, and given its already in the debugCallback function.
