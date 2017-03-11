import { evalBoard } from '../board-logic';

export function newGame(state, action) {
  const blankBoard = [ null, null, null, null, null, null, null, null, null ];
  let newState = state;
  if(action.samePlayers) {
    const playerOneName = state.get('playerOneName');
    const playerTwoName = state.get('playerTwoName');
    newState = newState.set('playerOneName', playerOneName)
                       .set('playerTwoName', playerTwoName)

  } else {
    newState = newState.set('playerOneName', '')
                       .set('playerTwoName', '')
  }
  return newState.set('gameSetupInProgress', true)
                 .set('blankSlate', false)
                 .set('gameInProgress', false)
                 .set('gameWon', false)
                 .set('gameDraw', false)
                 .set('board', blankBoard)
                 .set('games', { '0': 0, '1': 0 })
                 .set('winningIndices', null)
                 .set('currentPlayer', 0);
}

export function savePlayerName(state, action) {
  if (action.playerNumber == 0) {
    return state.set('playerOneName', action.playerName);
  } else {
    return state.set('playerTwoName', action.playerName);
  }
}

export function gameWon(state, action) {
  const games = state.get('games');
  games[action.playerNumber]++;
  return state.set('gameInProgress', false)
              .set('gameWon', true)
              .set('winningPlayer', action.playerNumber)
              .set('games', games)
              .set('winningIndices', action.winningIndices);

}

export function gameDraw(state, action) {
  return state.set('gameInProgress', false)
              .set('gameDraw', true);
}

export function makeMove(state, action) {
  const newBoard = state.get('board');
  newBoard[action.index] = action.playerNumber;
  const currentPlayer = (action.playerNumber === 0) ? 1 : 0;
  return state.set('board', newBoard)
              .set('currentPlayer', currentPlayer);
}

export function doneStarting(state, action) {
  return state.set('gameInProgress', true)
              .set('id', action.id)
              .set('gameSetupInProgress', false)
              .set('blankSlate', false);
}

export function replaceGame(state, action) {
  const players = action.attributes.players;
  const board = action.attributes.board;

  const result = evalBoard(action.attributes);
  if(result.gameInProgress) {
    return state.set('board', board)
                .set('playerOneName', players[0])
                .set('playerTwoName', players[1])
                .set('gameInProgress', true)
                .set('gameDraw', false)
                .set('gameWon', false)
                .set('againstComputer', result.againstComputer)
                .set('currentPlayer', result.currentPlayer);
  } else if (result.gameWon) {
    return state.set('board', board)
                .set('playerOneName', players[0])
                .set('playerTwoName', players[1])
                .set('gameInProgress', false)
                .set('gameDraw', false)
                .set('gameWon', [result.winningPlayer, result.winningIndices])
                .set('againstComputer', result.againstComputer)
                .set('gameSetupInProgress', true);
  } else {
    return state.set('board', board)
                .set('playerOneName', players[0])
                .set('playerTwoName', players[1])
                .set('gameInProgress', false)
                .set('gameDraw', true)
                .set('againstComputer', result.againstComputer)
                .set('gameSetupInProgress', true);
  }
}

export function setNotificationSystem(state, action) {
  return state.set('notificationSystem', action.notificationSystem);
}

export default function handleApp(state, action) {
  switch(action.type) {
    case "NEW_GAME":
      return newGame(state, action);
    case "SAVE_PLAYER_NAME":
      return savePlayerName(state, action);
    case "DONE_STARTING":
      return doneStarting(state, action);
    case "GAME_WON":
      return gameWon(state, action);
    case "GAME_DRAW":
      return gameDraw(state, action);
    case "MAKE_MOVE":
      return makeMove(state, action);
    case "REPLACE_GAME":
      return replaceGame(state, action);
    case "SET_NOTIFICATION_SYSTEM":
      return setNotificationSystem(state, action);
    default:
      return state;
  }
}
