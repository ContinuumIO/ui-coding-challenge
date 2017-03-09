import { expect } from 'chai';

import * as actions from '../src/redux/actions.js';
import * as constants from '../src/redux/constants.js';

describe('newGame', () => {
  it('creates a NEW_GAME action', () => {
    expect(actions.newGame(false)).to.deep.equal({
      type: constants.NEW_GAME,
      samePlayers: false,
    });
  });
});

describe('savePlayerName', () => {
  it('creates a SAVE_PLAYER_NAME action', () => {
    expect(actions.savePlayerName('John D', 0)).to.deep.equal({
      type: constants.SAVE_PLAYER_NAME,
      playerName: 'John D',
      playerNumber: 0,
    });
  });
})

describe('startGame', () => {
  it('creates a START_GAME action', () => {
    expect(actions.startGame()).to.deep.equal({
      type: constants.START_GAME,
    });
  });
})

describe('gameWon', () => {
  it('creates a GAME_WON action', () => {
    expect(actions.gameWon(0, [0,1,2])).to.deep.equal({
      type: constants.GAME_WON,
      playerNumber: 0,
      winningIndices: [0,1,2],
    });
  });
})

describe('gameDraw', () => {
  it('creates a GAME_DRAW action', () => {
    expect(actions.gameDraw()).to.deep.equal({
      type: constants.GAME_DRAW,
    });
  });
})

describe('makeMove', () => {
  it('creates a MAKE_MOVE action', () => {
    expect(actions.makeMove(0, 0)).to.deep.equal({
      type: constants.MAKE_MOVE,
      playerNumber: 0,
      index: 0,
    });
  });
})

describe('saveGame', () => {
  it('creates a SAVE_GAME action', () => {
    const attrs = {'fake': 0};
    expect(actions.saveGame(attrs)).to.deep.equal({
      type: constants.SAVE_GAME,
      attributes: attrs,
    });
  });
})

describe('loadGame', () => {
  it('creates a LOAD_GAME action', () => {
    expect(actions.loadGame('thisisafakeID')).to.deep.equal({
      type: constants.LOAD_GAME,
      id: 'thisisafakeID',
    });
  });
})

describe('replaceGame', () => {
  it('creates a REPLACE_GAME action', () => {
    expect(actions.replaceGame({
      'players': ['thing1', 'thing2'],
      'board': [null, null, null, null, null, null, null, null, null],
    })).to.deep.equal({
      type: constants.REPLACE_GAME,
      attributes: {
        'players': ['thing1', 'thing2'],
        'board': [null, null, null, null, null, null, null, null, null],
      },
    })
  })
})
