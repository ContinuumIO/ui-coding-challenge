import * as constants from './constants';

export function newGame(samePlayers) {
  return {
    type: constants.NEW_GAME,
    samePlayers,
  }
}

export function savePlayerName(playerName, playerNumber) {
  return {
    type: constants.SAVE_PLAYER_NAME,
    playerName,
    playerNumber,
  }
}

export function startGame() {
  return {
    type: constants.START_GAME,
  }
}

export function gameWon(playerNumber, winningIndices) {
  return {
    type: constants.GAME_WON,
    playerNumber,
    winningIndices,
  }
}

export function gameDraw() {
  return {
    type: constants.GAME_DRAW,
  }
}

export function makeMove(playerNumber, index) {
  return {
    type: constants.MAKE_MOVE,
    playerNumber,
    index,
  }
}

export function saveGame(attributes) {
  return {
    type: constants.SAVE_GAME,
    attributes,
  }
}


export function loadGame(id) {
  return {
    type: constants.LOAD_GAME,
    id,
  }
}

export function replaceGame(attributes) {
  return {
    type: constants.REPLACE_GAME,
    attributes,
  }
}
