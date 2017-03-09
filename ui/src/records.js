const Immutable = require('immutable');

/*
  gameInProgress includes victory screen
 */
export const AppRecord = Immutable.Record({
  gameInProgress: false,
  gameSetupInProgress: false,
  blankSlate: true,
  winningPlayer: null,
  winningIndices: null,
  playerOneName: '',
  playerTwoName: '',
  games: { '0': 0, '1': 0 },
  currentPlayer: 0,
  board: [ null, null, null, null, null, null, null, null, null ],
  gameWon: null,
  gameDraw: false,
  againstComputer: false,
})
