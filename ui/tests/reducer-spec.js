import { expect } from 'chai';

import * as constants from '../src/redux/constants';
import reducers from '../src/redux/reducers';
import { AppRecord } from '../src/redux/records';

describe('newGame', () => {
  it('takes state and resets players given right action', () => {
    const originalState = new AppRecord({
      playerOneName: 'John',
      playerTwoName: 'Needs a Job'
    });
    const action = {
      type: constants.NEW_GAME,
      samePlayers: false
    };
    const state = reducers(originalState, action);
    expect(state.playerOneName).to.equal('');
    expect(state.playerTwoName).to.equal('');
  });
});

describe('savePlayerName', () => {
  it('takes state and saves new player name for 0', () => {
    const originalState = new AppRecord();
    const action = {
      type: constants.SAVE_PLAYER_NAME,
      playerName: 'HIRE ME',
      playerNumber: 0
    };
    const state = reducers(originalState, action);
    expect(state.playerOneName).to.equal('HIRE ME');
  });
  it('takes state and saves new player name for 0', () => {
    const originalState = new AppRecord();
    const action = {
      type: constants.SAVE_PLAYER_NAME,
      playerName: 'HIRE ME',
      playerNumber: 1
    };
    const state = reducers(originalState, action);
    expect(state.playerTwoName).to.equal('HIRE ME');
  });
});

describe('startGame', () => {
  const originalState = new AppRecord({
    gameSetupInProgress: 'true'
  });
  const action = {
    type: constants.START_GAME
  };
  const state = reducers(originalState, action);
  expect(state.gameInProgress).to.be.equal(true);
  expect(state.gameSetupInProgress).to.be.equal(false);
});

describe('gameWon', () => {
  it('sets to appropriate state when game won', () => {
    const originalState = new AppRecord({
      gameInProgress: true,
      games: { '0': 0, '1': 0}
    });
    const action = {
      type: constants.GAME_WON,
      playerNumber: 0,
      winningIndices: [0, 1, 2]
    };
    const state = reducers(originalState, action);
    expect(state.gameInProgress).to.be.equal(false);
    expect(state.gameWon).to.be.equal(true);
    expect(state.winningPlayer).to.be.equal(0);
    expect(state.games).to.deep.equal({ '0': 1, '1': 0 });
    expect(state.winningIndices).to.deep.equal([0, 1, 2]);
  });
});

describe('gameWon', () => {
  it('sets to appropriate stat when game draw', () => {
    const originalState = new AppRecord({
      gameInProgress: true
    });
    const action = {
      type: constants.GAME_DRAW
    };
    const state = reducers(originalState, action);
    expect(state.gameInProgress).to.be.equal(false);
    expect(state.gameDraw).to.be.equal(true);
  });
});

describe('makeMove', () => {
  it('makes a move!', () => {
    const originalState = new AppRecord({
      gameInProgress: true
    });
    const action = {
      type: constants.MAKE_MOVE,
      playerNumber: 0,
      index: 0
    };
    const state = reducers(originalState, action);
    expect(state.gameInProgress).to.be.equal(true);
    expect(state.board[0]).to.be.equal(0);
  });
});

describe('replaceGame', () => {
  it('replaces with a game that is in progress', () => {
    const originalState = new AppRecord({
      board: [ 1, 0, 1, null, null, null, null, null, null],
      playerOneName: 'John',
      playerTwoName: 'Really hope this works',
      gameInProgress: false
    });
    const attributes = {
      'players': ['Probably', 'Wont work'],
      'board': [0, 1, 0, null, null, null, null, null, null]
    };
    const action = {
      type: constants.REPLACE_GAME,
      attributes
    };
    const state = reducers(originalState, action);
    expect(state.gameInProgress).to.be.equal(true);
    expect(state.currentPlayer).to.be.equal(1);
    expect(state.playerOneName).to.be.equal('Probably');
    expect(state.playerTwoName).to.be.equal('Wont work');
  });
});
