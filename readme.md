# Tile Game

Project #1 for General Assembly's Web Development Immersive Bootcamp.

## User Story

* A tile game is a picture split into "tiles" and scrambled; the player can move each tile horizontally or vertically in its track to reassemble the image (similar to a Rubik's cube).
  * In free play (no timer), the player can win by reassembling the image, but can't lose.
  * In a timed game, the player races against the clock – either completing the image in time (a win) or running out the timer without completing it (a loss).
* Player can move tiles with the arrow keys or by clicking the tile to move. On mobile screens, tapping a tile will move it.
* Holding the shift button or tapping the "See tile order" button will show the player the correct order of the tiles.


## Technologies Used

* HTML
* CSS \(including CSS transitions\)
* Vanilla JavaScript

## Pain Points

* I originally wanted to use CSS Grid but couldn't animate the tiles that way, so I moved to percentage-based positioning.
* I was hoping to let the user upload their own image, but had trouble with permanently cropping it square via JavaScript (the CSS requires a square image).

## In the Future

* DRY up the move functions and the game beginning/end states where lots of DOM elements are hidden or displayed at once.
* I think it would be nice to have the option to choose board size rather than always using a 4 x 4 board, but this would take some very serious reworking.
* [Trello Board](https://trello.com/b/fQTKFnfI) for reference
