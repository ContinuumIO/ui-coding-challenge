import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Game from './Game';
import NewGame from './NewGame';
import WinnerBanner from './WinnerBanner';
import axios from 'axios';
import '../styles/App.scss';

class App extends Component {
  state = {
    currentGame: null,
    previousPlayers: [],
    saveError: false
  }

  componentDidMount() {
    axios.get('/api/games')
      .then(resp => console.log(resp.data));
  }

  // Return a count of how many moves a player has made
  getMovesCount(player) {
    return this.state.currentGame.board.filter(move => move === player).length;
  }

  // Calculate the currentPlayer based on the gameBoard
  getCurrentPlayer() {
    const winner = this.getWinner();

    if (winner !== false) {
      return winner;
    }

    // If we have reached a draw, there is no current player
    if (this.checkForDraw()) {
      return false;
    }

    const xMoves = this.getMovesCount(0);
    const oMoves = this.getMovesCount(1);

    // Since X goes first if the players
    // have equal moves, X, or 0,  is up next
    return xMoves === oMoves ? 0 : 1;
  }

  // If all spaces on the board have been
  // played and there is no winner, we have a draw.
  // Could make this a bit more sophisticated
  checkForDraw() {
    const board = this.state.currentGame.board;
    return !this.checkForWinner() && board.filter(square => square !== null).length === board.length;
  }

  // Calculate a winner based on the game board
  getWinner() {
    if (!this.checkForWinner()) {
      return false;
    }

    const xMoves = this.getMovesCount(0);
    const oMoves = this.getMovesCount(1);

    // Since X goes first if the players have equal moves
    // and there is a winner, O should be declared the winner
    return xMoves === oMoves ? 1 : 0;
  }

  // Update the game on the server
  handleUpdateGame(game) {
    if (!game._id) {
      return;
    }

    axios.post(`/api/games/${game._id}`, game)
      .then(
        resp => {
          this.setState({
            ...this.state,
            saveError: false
          });
        },

        () => {
          this.setState({
            ...this.state,
            saveError: true
          });
        }
    );
  }

  // When a square is clicked, update the game board
  handleSquareClick = (i) => {
    const { board } = this.state.currentGame;
    const winner = this.checkForWinner();

    // If the space is already occupied, or there is a winner, just return
    if (board[i] !== null || winner) {
      return;
    }

    // create a new copy of board
    const nextBoard = board.slice();
    nextBoard[i] = this.getCurrentPlayer();

    const nextState = {
      ...this.state,
      currentGame: {
        ...this.state.currentGame,
        board: nextBoard
      }
    };

    this.handleUpdateGame(nextState.currentGame);
    this.setState(nextState);
  }

  // Check for existence of winning combinations on the board.
  // Bonus: return winning combinations found so we can display to the user
  checkForWinner() {
    if (!this.state.currentGame) {
      return false;
    }

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombinations.filter(combo => {
      const { board } = this.state.currentGame;
      const space1 = board[combo[0]];
      const space2 = board[combo[1]];
      const space3 = board[combo[2]];

      return space1 !== null && space1 === space2 && space1 === space3;
    })[0];
  }

  // Save a new game to the server, update state on completion
  handleSaveNewGame(game) {
    axios.post('/api/games', game)
      .then(
        // Successfull save of game
        resp => {
          this.setState({
            ...this.state,
            currentGame: {
              ...this.state.currentGame,
              _id: resp.data.id
            }
          });
        },

        // Error saving game
        () => {
          this.setState({
            ...this.state,
            saveError: true
          });
        }
      );
  }

  // Create a new game
  handleStartGame = (players) => {
    const game = {
      _id: null,
      board: [null, null, null, null, null, null, null, null, null],
      players
    };

    // Persist game to server
    this.handleSaveNewGame(game);

    this.setState({
      ...this.state,
      currentGame: game
    });
  }

  // Reset the currentGame, save a reference to
  // the current players to populate the <NewGame /> component
  handleNewGameClick = () => {
    this.setState({
      ...this.state,
      previousPlayers: this.state.currentGame.players,
      currentGame: null,
      saveError: false
    });
  }

  renderGame() {
    if (this.state.currentGame) {
      return (
        <Game
          winner={this.getWinner()}
          draw={this.checkForDraw()}
          currentPlayer={this.getCurrentPlayer()}
          players={this.state.currentGame.players}
          board={this.state.currentGame.board}
          onNewGameClick={this.handleNewGameClick}
          winningSquares={this.checkForWinner() || []}
          onSquareClick={this.handleSquareClick}
        />
      );
    }
  }

  renderNewGame() {
    // Only show our <NewGame /> component if there is not a current game
    if (!this.state.currentGame) {
      return (
        <NewGame players={this.state.previousPlayers} onStartGame={this.handleStartGame} />
      );
    }
  }

  // Show our <WinnerBanner />
  renderWinnerBanner() {
    let message = 'Great Job!';
    let winner = this.getWinner();

    if (winner === false && this.checkForDraw()) {
      winner = 'The Cat';
      message = 'Whomp Whomp!';
    } else {
      winner = this.state.currentGame.players[winner];
    }

    if (winner) {
      return (
        <WinnerBanner
          onPlayAgain={this.handleNewGameClick}
          winner={winner}
          message={message}
        />
      );
    }
  }

  render() {
    return (
      <div className="app">
        <h1 className="title">Hal 8999 - TicTacToe</h1>
        <ReactCSSTransitionGroup
          transitionName="winner-banner"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={300}
        >
          {this.state.currentGame && this.renderWinnerBanner()}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName="game"
          transitionAppear={true}
          transitionEnterTimeout={500}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.renderGame()}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="new-game"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={500}
        >
          {this.renderNewGame()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
