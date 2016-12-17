// Return a count of how many moves a player has made
export const getMovesCount = (board, player) => {
  return board.filter(move => move === player).length;
};

// Check for existence of winning combinations on the board.
// Bonus: return winning combinations found so we can display to the user
export const checkForWinner = (board) => {
  if (!board) {
    return false;
  }

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const winningCombo = winningCombinations.filter(combo => {
    const space1 = board[combo[0]];
    const space2 = board[combo[1]];
    const space3 = board[combo[2]];

    return space1 !== null &&
      (space1 === 0 || space1 === 1) &&
      space1 === space2 &&
      space1 === space3;
  })[0];

  return winningCombo || false;
};

// Calculate a winner based on the game board
export const getWinner = (board) => {
  const winner = checkForWinner(board);
  if (!winner) {
    return false;
  }

  // checkWinner returns the winning combination,
  // so we can us that to find the correct
  // index of the player in our board
  return board[winner[0]];
};

// If all spaces on the board have been
// played and there is no winner, we have a draw.
// Could make this a bit more sophisticated
export const checkForDraw = (board) => {
  return !checkForWinner(board) && board.filter(square => square !== null).length === board.length;
};

// Calculate the currentPlayer based on the gameBoard
export const getCurrentPlayer = (board) => {
  const winner = getWinner(board);

  if (winner !== false) {
    return winner;
  }

  // If we have reached a draw, there is no current player
  if (checkForDraw(board)) {
    return false;
  }

  const xMoves = getMovesCount(board, 0);
  const oMoves = getMovesCount(board, 1);

  // Since X goes first if the players
  // have equal moves, X, or 0,  is up next
  return xMoves === oMoves ? 0 : 1;
};
