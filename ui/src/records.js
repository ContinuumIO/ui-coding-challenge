const Immutable = require('immutable');

/*
  gameInProgress includes victory screen
 */
export const AppRecord = Immutable.Record({
  gameInProgress: false,
  gameSetupInProgress: false,
  blankSlate: true;
  playerOneName: '',
  playerTwoName: '',
  games: { '0': 0, '1': 0 },
  winningIndices: null;
  currentPlayer: 0,
  board: [ null, null, null, null, null, null, null, null, null ],
  gameWon: false,
  gameDraw: false,
  againstComputer: false,
})
