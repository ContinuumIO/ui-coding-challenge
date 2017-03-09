import * as constants from './constants';

export function newGame() {
  return {
    type: constants.NEW_GAME;
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

export function gameWon(playerNumber, indices) {
  return {
    type: constants.GAME_WON,
    playerNumber,
    indices,
  }
}

export function gameDraw() {
  return {
    type: constants.GAME_DRAW,
  }
}

export function makeMove(player, index) {
  return {
    type: constants.MAKE_MOVE,
    player,
    index,
  }
}

export function saveGame() {
  return {
    type: constants.SAVE_GAME,
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
