
/**
 * This function is important for the logic of loading a game.
 * Evaluate the board, determine characteristics to set state.
 * @param  {[type]} attributes [description]
 * @return {[type]}            [description]
 */
export function evalBoard(attributes) {
  const board = attributes.board;
  const results = {
    'gameInProgress': false,
    'gameWon': false,
    'gameDraw': false,
    'winningPlayer': null,
    'winningIndices': null,
    'againstComputer': null,
    'currentPlayer': null,
  }
  if (attributes.players[0].toLowerCase() === 'computer' ||
      attributes.players[1].toLowerCase() === 'computer') {
    results.againstComputer = true;
  }
  const diff = findWin(board);
  if(diff.gameInProgress) {
    var ones, zeroes;
    ones = board.filter(val => val === 1 );
    zeroes = board.filter(val => val === 0);
    if(zeroes.length > ones.length) {
      results.currentPlayer = 1;
    } else {
      results.currentPlayer = 0;
    }
  }
  Object.assign(results, diff);
  return results;
}

/**
 * Check first row for diagonal, vertical or horizontal wins
 *
 * @param  {array} board Array of length nine consisting of 0, 1, or null
 * @return {object} results of checking, keys will be win, draw, or game in progress
 */
export function findWin(board) {
  const winningSets = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var i=0; i<8; i++) {
    var prev = board[winningSets[i][0]];
    // check null or undefined
    if(prev == null) {
      continue;
    } else if (winningSets[i].every((val) => { return board[val] === prev })) {
      return { gameWon: true, winningPlayer: prev, winningIndices: winningSets[i] }
    } else {
      continue;
    }
  }
  board = board.filter((val) => { return val !== null });
  if(board.length === 9) {
    return { 'gameDraw': true };
  } else {
    return { 'gameInProgress': true };
  }
}
