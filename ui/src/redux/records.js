const Immutable = require('immutable');

/*
  being in the state of "gameInProgress" includes  a victory screen
 */
export const AppRecord = Immutable.Record({
  gameInProgress: false,
  gameSetupInProgress: false,
  blankSlate: true,
  id: null,
  winningPlayer: null,
  winningIndices: null,
  playerOneName: '',
  playerTwoName: '',
  currentPlayer: 0,
  board: [ null, null, null, null, null, null, null, null, null ],
  gameWon: null,
  gameDraw: false,
  againstComputer: false,
  notificationSystem: null,
  listOpen: false,
  waiting: false,
  games: [],
})
