
// choose background image

var randomNum = "img-" + Math.floor(Math.random() * 4 + 1); // choose random class for body
document.body.className = randomNum;



// setup function: move tile automatically if touched or clicked

var autoMove = function() {
	var thisRow = parseInt(this.className.split(" ")[0].replace("row-",""));
	var thisCol = parseInt(this.className.split(" ")[1].replace("column-",""));
	var openRow = tiles[15].y;
	var openCol = tiles[15].x;
	if (thisRow + 1 === openRow && thisCol === openCol) {
		moveDown();
	} else if (thisRow - 1 === openRow && thisCol === openCol) {
		moveUp();
	} else if (thisCol + 1 === openCol && thisRow === openRow) {
		moveRight();
	} else if (thisCol - 1 === openCol && thisRow === openRow) {
		moveLeft();
	};
};



// create tile objects

var tiles = [];

var Tile = function(id, x, y, img, dom, origRow, origCol) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.img = img;
	this.dom = dom;
	this.origRow = origRow; // for background image
	this.origCol = origCol; // for background image
};

for (var i = 0; i < 15; i++) {
	var domTile = document.getElementById("cell-" + (i + 1));
	x = parseInt(domTile.className.split(" ")[1].replace("column-","")); // grab column number from element
	y = parseInt(domTile.className.split(" ")[0].replace("row-","")); // grab row number from element
	origRow = y; // store original values for background image
	origCol = x;
	var newTile = new Tile(i + 1, x, y, "", domTile, origRow, origCol); // make new tile object
	tiles.push(newTile);
};



// make game board responsive

var tileGame = document.getElementById("tile-game");

var keepAspectRatio = function() {
	var width = tileGame.offsetWidth;
	tileGame.style.height = width + "px";
};

keepAspectRatio();

window.addEventListener("resize", keepAspectRatio); // adjust height on window resize



// create empty tile

var emptyTile = {
	id: "empty",
	x: 4,
	y: 4
};

tiles.push(emptyTile);



// functions for moving tiles

var moveLeft = function() {
	var currentRow = tiles[15].y;
	var currentCol = tiles[15].x;
	// find the element to move if it exists
	for (var i = 0; i < tiles.length - 1; i++) {
		if (tiles[i].y === currentRow && tiles[i].x === currentCol + 1) {
			var tileToMove = tiles[i];
			var domToMove = document.getElementById("cell-" + tileToMove.id);
			tileToMove.x--; // change position of new tile
			domToMove.className = "row-" + tileToMove.y + " column-" + tileToMove.x; // update DOM
			tiles[15].x++
		};
	};
	checkForWin();
};

var moveRight = function() {
	var currentRow = tiles[15].y;
	var currentCol = tiles[15].x;
	// find the element to move if it exists
	for (var i = 0; i < tiles.length - 1; i++) {
		if (tiles[i].y === currentRow && tiles[i].x === currentCol - 1) {
			var tileToMove = tiles[i];
			var domToMove = document.getElementById("cell-" + tileToMove.id);
			tileToMove.x++; // change position of new tile
			domToMove.className = "row-" + tileToMove.y + " column-" + tileToMove.x; // update DOM
			tiles[15].x--
		};
	};
	checkForWin();
};

var moveUp = function() {
	var currentRow = tiles[15].y;
	var currentCol = tiles[15].x;
	// find the element to move if it exists
	for (var i = 0; i < tiles.length - 1; i++) {
		if (tiles[i].y === currentRow + 1 && tiles[i].x === currentCol) {
			var tileToMove = tiles[i];
			var domToMove = document.getElementById("cell-" + tileToMove.id);
			tileToMove.y--; // change position of new tile
			domToMove.className = "row-" + tileToMove.y + " column-" + tileToMove.x; // update DOM
			tiles[15].y++
		};
	};
	checkForWin();
};

var moveDown = function() {
	var currentRow = tiles[15].y;
	var currentCol = tiles[15].x;
	// find the element to move if it exists
	for (var i = 0; i < tiles.length - 1; i++) {
		if (tiles[i].y === currentRow - 1 && tiles[i].x === currentCol) {
			var tileToMove = tiles[i];
			var domToMove = document.getElementById("cell-" + tileToMove.id);
			tileToMove.y++; // change position of new tile
			domToMove.className = "row-" + tileToMove.y + " column-" + tileToMove.x; // update DOM
			tiles[15].y--
		};
	};
	checkForWin();
};



// listen on the document for arrow keys and fire move functions

var listenToArrowKeys = function(event) {
	if (event.which === 37) {
		event.preventDefault();
        moveLeft();
    } else if (event.which === 38) {
    	event.preventDefault();
        moveUp();
    } else if (event.which === 39) {
    	event.preventDefault();
        moveRight();
    } else if (event.which === 40) {
    	event.preventDefault();
        moveDown();
    };
};

var startGame = function() {
	shuffleBoard();
	document.addEventListener("keydown",listenToArrowKeys);
	document.getElementById("start-game").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById("timer").style.display = "block";
	document.getElementById("tile-order").style.display = "block";
	document.getElementById("try-again").style.display = "none";
	if (document.getElementById("timer-switch").checked === true) {
		startTimer();
		document.getElementById("colon").style.display = "inline";
		document.getElementById("minutes").style.display = "inline";
		document.getElementById("seconds").style.display = "inline";
	};
	for (var i = 0; i < 15; i++) { // start listening to clicks
	var domTile = document.getElementById("cell-" + (i + 1));
	if (screen.width > 750) { // only apply click for desktop computers
 		tiles[i].dom.addEventListener("click",autoMove);
	};
	tiles[i].dom.addEventListener("touchstart",autoMove);
};
};

document.getElementById("start-game").addEventListener("click",startGame);
document.getElementById("try-again").addEventListener("click",function(){
	location.reload();
});



// shuffle board

var randomMovement = function() {
	var rand = Math.floor(Math.random() * 4);
	if (rand === 0) {
		moveLeft();
	} else if (rand === 1) {
		moveUp();
	} else if (rand === 2) {
		moveRight();
	} else {
		moveDown();
	};
};

var shuffleBoard = function() {
	for (var i = 0; i < 3000; i++) {
		randomMovement();
	};
	moveLeft(); // reset empty space to bottom-right
	moveLeft();
	moveLeft();
	moveUp();
	moveUp();
	moveUp();
	tileGame.className = ""; // erase game over states
	document.getElementById("game-success").style.display = "none";
	document.getElementById("game-failure").style.display = "none";
	document.getElementById("start-game").addEventListener("click",startGame);
};



// win script

var checkForWin = function() {
	var didIWin = 0;
	for (var i = 0; i < tiles.length - 1; i++) {
		if (tiles[i].x === tiles[i].origCol && tiles[i].y === tiles[i].origRow) {
			didIWin++; // if tile is in original spot, tick up variable
		};
	};
	if (didIWin === 15) {
		document.getElementById("game-success").style.display = "inline"; // display win message
		tileGame.className = "success"; // push tiles together (css)
		document.removeEventListener("keydown",listenToArrowKeys);
		for (var i = 0; i < 15; i++) {
	 	 	tiles[i].dom.removeEventListener("click",autoMove);
			tiles[i].dom.removeEventListener("touchstart",autoMove);
		};
		document.getElementById("try-again").style.display = "block";
		clearInterval(gameTimer);
	};
};



// show tile numbers when the user holds down shift

var shiftTimer;

document.addEventListener("keydown",function(event){
    if (event.which === 16) {
        document.getElementById("arena").className = "shift-pressed";
        shiftTimer = setTimeout(function(){
        	document.getElementById("arena").className = "";
        }, 5000);
    };
});

document.addEventListener("keyup",function(event){
    if (event.which === 16) {
		document.getElementById("arena").className = "";
		clearTimeout(shiftTimer);
    };
});

document.getElementById("tile-order").addEventListener("click",function(event){
    document.getElementById("arena").className = "shift-pressed";
   	shiftTimer = setTimeout(function(){
    	document.getElementById("arena").className = "";
    }, 5000);
});



// game timer

var timerAmount = 5; // timer amount in minutes
var timeRemaining; // hoist
var gameTimer;
var minutesDom = document.getElementById("minutes");
var secondsDom = document.getElementById("seconds");

var showHideTimer = function() {
	if (document.getElementById("timer-switch").checked === true) {
		document.getElementById("timer").style.display = "block";
	} else {
		document.getElementById("timer").style.display = "none";
	}
};

document.getElementById("timer-switch").addEventListener("change",showHideTimer);
document.getElementById("timer-dropdown").addEventListener("change",function(){
	timerAmount = this.selectedIndex + 1;
	minutesDom.textContent = this.selectedIndex + 1; // index starts at 0; add 1 to get value
});

var checkForTimerEnd = function() {
	if (timeRemaining <= 0) {
		document.getElementById("game-failure").style.display = "inline";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("tile-order").style.display = "none";
		document.removeEventListener("keydown",listenToArrowKeys);
 		for (var i = 0; i < 15; i++) {
	 	 	tiles[i].dom.removeEventListener("click",autoMove);
			tiles[i].dom.removeEventListener("touchstart",autoMove);
		};
		clearInterval(gameTimer);
	};
};

var startTimer = function() {
	timeRemaining = timerAmount * 60; // format to seconds

	gameTimer = setInterval(function(){
		timeRemaining--;
		minutes = Math.floor(timeRemaining / 60);
		seconds = timeRemaining % 60;
		if (seconds.toString().length === 1) { // format seconds to two digits
			seconds = "0" + seconds.toString();
		};
		minutesDom.textContent = minutes; // update DOM
		secondsDom.textContent = seconds;
		checkForTimerEnd();
	}, 1000)
}; // timer is called when game begins










// old version to put class on tile-game instead of arena

// document.addEventListener("keydown",function(event){
//     if (event.which === 16) {
//         tileGame.className += " shift-pressed"; // extra space in case it already has .success
//     };
// });

// document.addEventListener("keyup",function(event){
//     if (event.which === 16) {
//         tileGame.className = tileGame.className.replace("shift-pressed","").replace(" ","");
//     }; // remove class and extra spaces
// });





// adjust positioning for tile background images (MOVED TO CSS)

/*

var setBackgroundOffsets = function() {
	var tileWidth = tiles[0].dom.offsetWidth;
	for (var i = 0; i < tiles.length - 1; i++) {
		var backgroundClasses = "";
		if (tiles[i].origCol === 2) {
			backgroundClasses += "background-position-x: -" + tileWidth + "px; ";

		} else if (tiles[i].origCol === 3) {
			backgroundClasses += "background-position-x: -" + (tileWidth * 2) + "px; ";
		} else if (tiles[i].origCol === 4) {
			backgroundClasses += "background-position-x: 100%; ";
		};
		if (tiles[i].origRow === 2) {
			backgroundClasses += "background-position-y: -" + tileWidth + "px";
		} else if (tiles[i].origRow === 3) {
			backgroundClasses += "background-position-y: -" + (tileWidth * 2) + "px";
		} else if (tiles[i].origRow === 4) {
			backgroundClasses += "background-position-y: 100%";
		};
		tiles[i].dom.setAttribute("style",backgroundClasses);
	};
};

*/
































