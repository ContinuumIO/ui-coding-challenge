import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Button from './Button';
import Players from './Players';
import GamePieceX from './GamePieceX';
import GamePieceO from './GamePieceO';
import WinningLine from './WinningLine';
import '../styles/Game.scss';

class Game extends Component {
  static propTypes = {
    draw: PropTypes.bool,
    players: PropTypes.array,
    board: PropTypes.array.isRequired,
    onNewGameClick: PropTypes.func.isRequired,
    winningSquares: PropTypes.array,
    onSquareClick: PropTypes.func.isRequired
  }

  // Return what should populate the square, if anything
  gamePiece(square) {
    let piece;

    if (square !== null) {
      piece = square === 0 ? <GamePieceX /> : <GamePieceO />;
    }

    return piece;
  }

  // Check the square to see if it is part of a winning combination
  isWinningSquare(i) {
    return this.props.winningSquares.indexOf(i) > -1;
  }

  // Return an array of <Square /> to be used as the game board
  renderBoard() {
    return this.props.board.map((square, i) => {
      return (
        <Square
          key={i}
          winner={this.isWinningSquare(i)}
          onClick={() => this.props.onSquareClick(i)}
        >
          {this.gamePiece(square)}
        </Square>
      );
    });
  }

  renderNewGameButton() {
    const disabled = this.props.winner !== false || this.props.draw;
    return (
      <Button disabled={disabled} onClick={this.props.onNewGameClick}>
        New Game
      </Button>
    );
  }

  render() {
    return (
      <div className="game-board">
        <div className="players-info">
          <Players
            players={this.props.players}
            winner={this.props.winner}
            currentPlayer={this.props.currentPlayer}
          />
        </div>
        <div className="board">
          {this.renderBoard()}
          <WinningLine path={this.props.winningSquares && this.props.winningSquares.join(',')} />
        </div>
        {this.renderNewGameButton()}
      </div>
    );
  }
}

export default Game;
