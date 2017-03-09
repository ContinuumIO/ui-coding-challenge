import AppRecord from './records';

export function newGame(state, action) {
  const blankBoard = [ null, null, null, null, null, null, null, null, null ];
  if(action.samePlayers) {
    return state.set('gameSetupInProgress', true)
                .set('blankSlate', false)
                .set('board', blankBoard);
  } else {
    return state.set('gameSetupInProgress', true)
                .set('blankSlate', false)
                .set('board', blankBoard)
                .set('games', { '0': 0, '1': 0 })
                .set('playerOneName', '')
                .set('playerTwoName', '');
  }
}

};


export function savePlayerName(state, action) {
  if (action.playerNumber == 0) {
    return state.set('playerOneName', action.playerName);
  } else {
    return state.set('playerTwoName', action.playerName);
  }
}

export function startGame(state, action) {
  return state.set('gameInProgress', true)
              .set('gameSetupInProgress', false);
}

export function gameWon(state, action) {
  const games = state.get('games');
  games[action.playerNumber]++;
  return state.set('gameInProgress', false)
              .set('gameWon', true)
              .set('winningPlayer', action.playerNumber)
              .set('games', games),
              .set('winningIndices', action.indices);

}
export default function handleApp(state, action) {
  switch(action.type) {
    case "NEW_GAME":
      return newGame(state, action);
    case "SAVE_PLAYER_NAME":
      return savePlayerName(state, action);
    case "START_GAME":
      return startGame(state, action);
    case "GAME_WON":
      return gameWon(state, action);
    case "GAME_DRAW":
      return gameDraw(state, action);
    case "MAKE_MOVE":
      return makeMove(state, action);
    case "SAVE_GAME":
      return saveGame(state, action);
    case "LOAD_GAME":
      return loadGame(state, action);
    default:
      return state;
  }
}
