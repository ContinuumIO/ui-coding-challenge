
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
    'indices': null,
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
  // horizontal check
  var sum;
  var indices = [];
  for (var i=0; i<=6; i += 3) {
    sum = 0;
    indices = [];
    for(var j=0; j<3; j++) {
      if(board[i+j] == null) {
        sum = -100;
        break;
      }
      sum += board[i+j];
      indices.push(i+j)
    }
    if (sum === 3 || sum === 0) {
      return { 'gameWon' : true, winningPlayer: sum/3, indices }
    }
  }
  for (var i=0; i<3; i++) {
    sum = 0;
    indices = [];
    for (var j=0; j<=6; j+=3) {
      if(board[i+j] == null) {
        sum = -100;
        break;
      }
      sum += board[i+j];
      indices.push(i+j);
    }
    if (sum === 3 || sum === 0) {
      return { 'gameWon' : true, 'winningPlayer': sum/3, indices }
    }
  }
  for (var j=0; j<3; j++) {
    sum = 0;
    indices = [];
    if(board[(4*j)] == null) {
      sum = -100;
      break;
    }
    sum += board[4*j];
    indices.push(4*j);
    if (sum === 3 || sum === 0) {
      return { 'win' : true, 'winningPlayer': sum/3, indices }
    }
  }
  for (var i=0; i<3; i++) {
    sum = 0;
    indices = [];
    if(board[2+(2*i)] == null) {
      sum = -100;
      break;
    }
    sum += board[2+(2*i)];
    indices.push(2+(2*i));
    if (sum === 3 || sum === 0) {
      return { 'gameWon' : true, 'winningPlayer': sum/3, indices }
    }
  }
  board = board.filter((val) => { return val !== null });
  if(board.length === 9) {
    return { 'gameDraw': true };
  } else {
    return { 'gameInProgress': true };
  }
}
