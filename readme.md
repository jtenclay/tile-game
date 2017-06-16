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
* CSS
* Vanilla Javascript

## Pain Points

* I originally wanted to use CSS Grid but couldn't animate the tiles that way, so I moved to positioning using percentages.
* I was hoping to let the user upload their own image, but had trouble with permanently cropping it to square via javascript (the css requires a square image).