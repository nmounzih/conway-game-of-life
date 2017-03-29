# conway-game-of-life

This is an application that plays Conway's Game of Life. This is a zero person game. It is written in javascript and played on a grid. The user can click the boxes and then start the game. At intervals, the app will either mark cells in the grid as dead or alive, and they figure on the grid will change.

# Rules
- A cell with less than 2 LIVE neighbors or greater than 3 LIVE neighbors, dies.
- A cell with 2 or 3 LIVE neighbors, lives on.
- A DEAD cell with 3 LIVE neighbors is born again.

The game goes on until it is not possible to make any more moves (or unless it's in an infinite loop).
