# Tile Game

Project #1 for General Assembly's Web Development Immersive Bootcamp.

## User Story

* A tile game is a picture split into "tiles" and scrambled; the player can move each tile horizontally or vertically in its track to reassemble the image (similar to a rubik's cube).
  * In free play (no timer), the player can win by reassembling the image, but can't lose.
  * In a timed game, the player races against the clock – either completing the image in time (win) or running out the timer without completing it (lose).
* Player can move tiles with the arrow keys or by clicking the tile to move. On mobile, tapping a tile will move it.
* Holding the shift button or tapping the "See tile order" button will show the player the correct order of the tiles.


## Technologies Used

* HTML
* CSS \(including CSS transitions\)
* Vanilla Javascript

## Pain Points

* I originally wanted to use CSS Grid but couldn't animate the tiles that way, so I moved to positioning using percentages.
* I was hoping to let the user upload their own image, but had trouble with permanently cropping it to square via javascript (the css requires a square image).

## In the Future

* DRY up the move functions and the game beginning/end states where lots of DOM elements are hidden or displayed at once.
* I think it would be nice to have the option to choose board size rather than always using a 4 x 4 board, but this would take some very serious reworking.
* [Trello Board](https://trello.com/b/fQTKFnfI) for reference