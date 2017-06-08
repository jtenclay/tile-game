
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

document.addEventListener("keydown",function(event){
    if (event.which === 37) {
        moveLeft();
    } else if (event.which === 38) {
        moveUp();
    } else if (event.which === 39) {
        moveRight();
    } else if (event.which === 40) {
        moveDown();
    };
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
	tileGame.className = ""; // erase win messages
	document.getElementById("game-success").style.display = "none";
};

document.getElementById("re-shuffle-button").addEventListener("click", shuffleBoard);



// win script

var checkForWin = function() {
	var didIWin = 0;
	for (var i = 0; i < tiles.length - 1; i++) {
		if (tiles[i].x === tiles[i].origCol && tiles[i].y === tiles[i].origRow) {
			didIWin++; // if tile is in original spot, tick up variable
		};
	};
	if (didIWin === 15) {
		document.getElementById("game-success").style.display = "block"; // display win message
		tileGame.className = "success"; // push tiles together (css)
	};
};



// show tile numbers when the user holds down shift




// keydown: add class to display numbers
// keyup: remove class to hide numbers




document.addEventListener("keydown",function(event){
    if (event.which === 16) {
        document.getElementById("arena").className = "shift-pressed";
    };
});

document.addEventListener("keyup",function(event){
    if (event.which === 16) {
        document.getElementById("arena").className = "";
    };
});





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
































