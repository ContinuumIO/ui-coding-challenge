import * as constants from './constants';

export function newGame(samePlayers) {
  return {
    type: constants.NEW_GAME,
    samePlayers
  };
}

export function savePlayerName(playerNumber, playerName) {
  return {
    type: constants.SAVE_PLAYER_NAME,
    playerName,
    playerNumber
  };
}

export function startGame() {
  return {
    type: constants.START_GAME
  };
}

export function doneStarting(id) {
  return {
    type: constants.DONE_STARTING,
    id
  };
}

export function gameWon(playerNumber, winningIndices) {
  return {
    type: constants.GAME_WON,
    playerNumber,
    winningIndices
  };
}

export function gameDraw() {
  return {
    type: constants.GAME_DRAW
  };
}

export function makeMove(playerNumber, index) {
  return {
    type: constants.MAKE_MOVE,
    playerNumber,
    index
  };
}

export function saveGame() {
  return {
    type: constants.SAVE_GAME
  };
}

export function toggleList() {
  return {
    type: constants.TOGGLE_LIST
  };
}

export function toggleWaiting() {
  return {
    type: constants.TOGGLE_WAITING
  };
}

export function listGames(games) {
  return {
    type: constants.LIST_GAMES,
    games
  };
}

export function loadGame(id) {
  return {
    type: constants.LOAD_GAME,
    id
  };
}

export function replaceGame(attributes) {
  return {
    type: constants.REPLACE_GAME,
    attributes
  };
}

export function setNotificationSystem(notificationSystem) {
  return {
    type: constants.SET_NOTIFICATION_SYSTEM,
    notificationSystem
  };
}
