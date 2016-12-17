import {
  checkForWinner,
  getWinner,
  checkForDraw,
  getCurrentPlayer
} from '../helpers/game';

describe('checkForWinner', () => {
  it('returns false when there is no winner', () => {
    const board = Array(9).fill(null);

    expect(checkForWinner(board)).toEqual(false);
  });

  it('returns the the winning combination when there is a winner', () => {
    const board = Array(9).fill(null);
    board[0] = 1;
    board[1] = 1;
    board[2] = 1;

    expect(checkForWinner(board)).toEqual([0, 1, 2]);
  });

  it('only returns the winner for valid input', () => {
    const board = Array(9).fill(null);
    board[0] = true;
    board[1] = true;
    board[2] = true;

    expect(checkForWinner(board)).toEqual(false);
  });
});

describe('getWinner', () => {
  it('returns false when there is no winner', () => {
    const board = Array(9).fill(null);

    expect(getWinner(board)).toEqual(false);
  });

  it('returns the correct index when there is a winner', () => {
    const board = Array(9).fill(null);
    board[0] = 1;
    board[1] = 1;
    board[2] = 1;

    expect(getWinner(board)).toEqual(1);
  });
});

describe('checkForDraw', () => {
  it('returns false when there is no draw', () => {
    const board = Array(9).fill(null);

    expect(checkForDraw(board)).toEqual(false);
  });

  it('returns true when there is a draw', () => {
    const board = Array(9).fill(true);

    expect(checkForDraw(board)).toEqual(true);
  });
});

describe('getCurrentPlayer', () => {
  it('returns the players who move is next', () => {
    const board = Array(9).fill(null);
    board[0] = 0;

    expect(getCurrentPlayer(board)).toEqual(1);
  });
});
