//Request node
var request = require('request');
//FS node
var fs = require('fs');


//User input for which process to run
var thingToDo = process.argv[2];
//User input for what to look up in the process.
var toDoThing = process.argv[3];

// console.log(thingToDo); Works!!!

// console.log(toDoThing); Works!!!





//movie function...
function movie(){

	// console.log('I made it this far'); works!!!
	// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
	// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
	// It's on Netflix!
	if(toDoThing == null) {
		//If user input was empty
		var movieName = "Mr. Nobody";
	}
	else {

		//capture user input in variable
		var movieName = toDoThing;
	}

	//html address to get the data
	var getter = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json';

	//request to get the data from omdb
	request(getter, function (error, response, data) {

		//console.log error
		 if (error) {
	        console.log('Error: ' + error);
	        return;
	    }
		//bring on the data!
		else {
			//parse the data			
			var datas = JSON.parse(data);

			//console.log the data response
			// Title of the movie.
			// Year the movie came out.
			// IMDB Rating of the movie.
			// Country where the movie was produced.
			// Language of the movie.
			// Plot of the movie.
			// Actors in the movie.
			// Rotten Tomatoes Rating.
			// Rotten Tomatoes URL.


			console.log('Title: ' + datas.Title + " Year: " + datas.Year + " Rated: " + datas.Rated + " Location: " + datas.Country + " Language: " + 
				datas.Language + " Plot: " + datas.Plot + " Actors: " + datas.Actors + " Rotten Tomatoes Rating: " + datas.tomatoUserMeter + 
				" Link: " + datas.tomatoURL);
		}
	});
};


//Do it now function...
function doItNow(){

		// console.log('I made it this far'); works!!!
		// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
		//readFile the random.txt file we created 
		fs.readFile("random.txt", "utf8", function(error, data) {
		
		//console.log error
		if (error) {
	        console.log('Error: ' + error);
	        return;
	    }

	    //bring on the data!
		else {
			var splitData = data.split(',');

			//make = user inputs
			thingToDo = splitData[0];
			toDoThing = splitData[1];

			start();
			// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
			// Feel free to change the text in that document to test out the feature for other commands.
		}
	})
};

function start(){
if (thingToDo == 'my-tweets'){

	//Twitter node
	var twitter = require('twitter');
	//twitter idenity key
	var twitterKeys = require('./keys.js');
	// Setting a local variable = to the twitter keys
	var client = new twitter(twitterKeys);
	// console.log(client); log worked!!!
	// var params = {screen_name: 'nodejs'};
	// client.get('statuses/user_timeline', params, function(error, tweets, response) {
 	//  		if (!error) {
 	//    		console.log(tweets);
 	//  			}
	// 		}); from api help file

	//twitter function for pulling data from twitter and console logging it
	function workPlease(){


	// console.log('I made it this far'); Worrks!!1


	// This will show your last 3 tweets (I only have three tweets) and when they were created at in your terminal/bash window.
	//set the user name and number of tweets
	var params = {screen_name: 'Rising_Phoenix0'};
	console.log(params);
	//get user timeline
	client.get('statuses/user_timeline', params, function(error, tweets) {
	 	//console.log error
	 	if (error) {
		    console.log('Error: ' + error);
		    return;
		}
	 	
	 	//display code if there is no error
	 	else {
		
			//display tweets
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
			}    
		}
	

	});
};
	workPlease();

	console.log('get me my tweets');
}

else if (thingToDo == 'spotify-this-song'){
	// 	This will show the following information about the song in your terminal/bash window
//spotify function for pulling data and running it
function spotify(){


	//Spotify node
	var spotify = require('spotify');
	//console.log works commenting out
	// console.log('I made it this far');

if(toDoThing == null) {
	// if no song is provided then your program will default to
	// "The Sign" by Ace of Base
	toDoThing = 'the sign';

	//console.log works commenting out
	// console.log(toDoThing);
}

spotify.search({ type: 'track', query: toDoThing}, function(error, data) {
	    //console.log error
	    if (error) {
	        console.log('Error: ' + error);
	        return;
	    }
	 	
	 	//display code if there is no error
		else {

			// Artist(s)
			var artistName = data.tracks.items[0].artists[0].name;

			// The song's name
			var songName = data.tracks.items[0].name;

			/// A preview link of the song from Spotify
			var link = data.tracks.items[0].external_urls.spotify;
			
			// The album that the song is from
			var albumName = data.tracks.items[0].album.name
			
			//console.log it!
			console.log('Spotified!!! Tittle: ' + songName + " By: " + artistName + " Album: " + albumName + " Spotify Link: " + link);
			
			}			
	});
};
	spotify();
	//console.log works commenting out
	// console.log('spot:');
}

else if (thingToDo == 'movie-this'){
	movie();
	console.log('Movie');
}

else if (thingToDo == 'do-what-it-says'){
	doItNow();
	console.log('Do it, Do it now!');
}

else {
	console.log('Please enter my-tweets, spotify-this-song, movie-this, or do-what-it-says');
}
};

//Start the ball rolling
start();