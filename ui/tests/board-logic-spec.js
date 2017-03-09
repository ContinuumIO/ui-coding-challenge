import { expect } from 'chai';
import { findWin, evalBoard } from '../src/board-logic';

describe('findWin', () => {
  it('returns a draw when expected', () => {
    const board = [0, 1, 0, 0, 1, 1, 1, 0, 0];
    expect(findWin(board)).to.deep.equal({
      gameDraw: true,
    });
  });
  it('returns game in progress when expected', () => {
    const board = [null, 1, null, 0, 0, 1, 0, 1, 0, 1];
    expect(findWin(board)).to.deep.equal({
      gameInProgress: true,
    });
  });
  it('returns wins for horizontal', () => {
    const boardOne = [1, 1, 1, 0, 1, 0, 0, null, null];
    const boardTwo = [0, 0, 0, 1, 0, 1, 1, null, null];
    const boardThree = [0, null, null, 1, 1, 1, 0, 1, 0];
    const boardFour = [1, null, null, 0, 0, 0, 1, 0, 1];
    const boardFive = [0, null, null, 0, null, 0, 1, 1, 1];
    const boardSix = [1, null, null, 1, null, 1, 0, 0, 0];
    expect(findWin(boardOne)).to.deep.equal({
      gameWon: true,
      winningPlayer: 1,
      indices: [0, 1, 2],
    });
    expect(findWin(boardTwo)).to.deep.equal({
      gameWon: true,
      winningPlayer: 0,
      indices: [0, 1, 2],
    });
    expect(findWin(boardThree)).to.deep.equal({
      gameWon: true,
      winningPlayer: 1,
      indices: [3, 4, 5],
    });
    expect(findWin(boardFour)).to.deep.equal({
      gameWon: true,
      winningPlayer: 0,
      indices: [3, 4, 5],
    });
    expect(findWin(boardFive)).to.deep.equal({
      gameWon: true,
      winningPlayer: 1,
      indices: [6, 7, 8],
    });
    expect(findWin(boardSix)).to.deep.equal({
      gameWon: true,
      winningPlayer: 0,
      indices: [6, 7, 8],
    });
  });
  //TODO make sure it works for diag and vertical
})

describe('evalBoard', () => {
  it('returns results with gameInProgress data', () => {
    const attributes = {
      "players": ['John', "Continuum Analytics"],
      "board": [null, null, null, null, null, null, 1, 0, null],
    };
    expect(evalBoard(attributes)).to.deep.equal({
      'gameInProgress': true,
      'gameWon': false,
      'gameDraw': false,
      'winningPlayer': null,
      'indices': null,
      'againstComputer': null,
      'currentPlayer': 0,
    });
  });
  it('same game in progress test with another board', () => {
    const attributes = {
      "players": ['John', "Continuum Analytics"],
      "board": [0, 1, 0, null, null, null, null, null, null],
    };
    expect(evalBoard(attributes)).to.deep.equal({
      'gameInProgress': true,
      'gameWon': false,
      'gameDraw': false,
      'winningPlayer': null,
      'indices': null,
      'againstComputer': null,
      'currentPlayer': 1,
    });
  })
  it('returns result with Won data', () => {
    const board = [1, 1, 1, 0, 1, 0, 0, null, null];
    const attributes = {
      players: ["Hire me", "please"],
      board,
    }
    expect(evalBoard(attributes)).to.deep.equal({
      'gameInProgress': false,
      'gameWon': true,
      'gameDraw': false,
      'winningPlayer': 1,
      'indices': [0,1,2],
      'againstComputer': null,
      'currentPlayer': null,
    });
  });
})
