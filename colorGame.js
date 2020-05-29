// keeps track of whether we're in Easy or Hard Mode
var numSquares = 6; 

// returns a 6 element array of random colors 
var colors = generateRandomColors(numSquares); 

// select color tiles
var squares = document.querySelectorAll(".square"); 

// goal color, arbitrarily picked for rn
var pickedColor = pickColor(); 

// goal color displayed in header
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor; 

// correct/incorrect message
var messageDisplay = document.querySelector("#message");

// select h1 to change background to correct color
var h1 = document.querySelector("h1"); 

// select New Colors Button
var resetButton = document.querySelector("#reset"); 

resetButton.addEventListener("click", function(){
	// generate all new colors
	// pick a new random goal color
	// change colors of squares
	colors=generateRandomColors(numSquares); 
	pickedColor=pickColor(); 
	this.textContent = "New Colors";
	colorDisplay.textContent = pickedColor; 
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor=colors[i]; 
	}
	h1.style.backgroundColor = "steelblue"; 
	messageDisplay.textContent = ""; 
}); 

// difficulty level
var easyButton = document.querySelector("#easy"); 
var hardButton = document.querySelector("#hard"); 

easyButton.addEventListener("click", function(){
	easyButton.classList.add("selected");
	hardButton.classList.remove("selected");
	numSquares = 3; 
	colors = generateRandomColors(numSquares); 
	pickedColor = pickColor(); 
	colorDisplay.textContent=pickedColor; 

	// hide bottom 3 squares
	for(var i=0; i<squares.length; i++){
		// if there is a next new color, set it
		if(colors[i]){
			squares[i].style.background = colors[i]; 
		}
		else{
			squares[i].style.display = "none"; 
		}
	}

});

hardButton.addEventListener("click", function(){
	easyButton.classList.remove("selected");
	hardButton.classList.add("selected");
	numSquares=6;
	colors = generateRandomColors(numSquares); 
	pickedColor = pickColor(); 
	colorDisplay.textContent=pickedColor; 

	// show squares
	for(var i=0; i<squares.length; i++){
		// if there is a next new color, set it
		squares[i].style.background = colors[i]; 
		squares[i].style.display = "block"; 
	
	}

});


// Main Game Logic
for(var i=0; i<squares.length; i++){
	// add initial colors to squares
	squares[i].style.backgroundColor=colors[i];

	//add event listeners for click
	squares[i].addEventListener("click", function(){
		// grab color of clicked square and compare to pickedColor
		var clickedColor=this.style.backgroundColor; 
		if(clickedColor === pickedColor){
			messageDisplay.textContent="Correct!"; 
			// changes color of all tiles to match correct color
			changeColors(clickedColor);
			h1.style.backgroundColor=clickedColor; 
			resetButton.textContent="Play Again?";
		}
		else{
			this.style.backgroundColor="#232323";
			messageDisplay.textContent="Try Again!"; 
		}
	}); 
}


// Helper Functions 


function changeColors(color){
	// change all tiles to a given color
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color; 
	}
}

function pickColor(){
	// pick random number from 0 to colors.length-1
	var index = Math.floor(Math.random()*colors.length);
	return colors[index]; 
}

function generateRandomColors(n){
	// create array
	var arr=[]; 
	// add n random colors
	for(var i=0; i<n; i++){
		// get random color
		arr[i]=randomColor(); 
	}
	// return
	return arr; 
}

function randomColor(){
	var r =Math.floor(Math.random()*256);
	var g =Math.floor(Math.random()*256);
	var b =Math.floor(Math.random()*256);
	// build string and return
	return "rgb(" + r + ", " + g + ", "+ b + ")"; 
}



